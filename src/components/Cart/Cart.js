import s from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${ cartCtx.totalAmount.toFixed(2) }`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem(item);
  };

  return <Modal onClose={ props.onClose }>
    <ul className={ s['cart-items'] }>
      {
        cartCtx.items.map(item =>
          <CartItem
            key={ item }
            name={ item.name }
            amount={ item.amount }
            price={ item.price }
            onRemove={ cartItemRemoveHandler.bind(null, item.id) }
            onAdd={ cartItemAddHandler.bind(null, item) }
          />,
        )
      }
    </ul>
    <div className={ s.total }>
      <span>Total Amount</span>
      <span>{ totalAmount }</span>
    </div>
    <div className={ s.actions }>
      <button className={ s['button--alt'] } onClick={ props.onClose }>Close
      </button>
      { hasItems && <button className={ s.button }>Order</button> }
    </div>
  </Modal>;
};

export default Cart;