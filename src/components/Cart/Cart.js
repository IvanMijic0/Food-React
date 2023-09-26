import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import s from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${ cartCtx.totalAmount.toFixed(2) }`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://food-order-a2f65-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        });

      if (response.ok) {
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      } else {
        console.error('Something went wrong!');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const cartItems =
    <ul className={ s['cart-items'] }>
      {
        cartCtx.items.map(item =>
          <CartItem
            key={ item.id }
            name={ item.name }
            amount={ item.amount }
            price={ item.price }
            onRemove={ cartItemRemoveHandler.bind(null, item.id) }
            onAdd={ cartItemAddHandler.bind(null, item) }
          />,
        )
      }
    </ul>;

  const modalActions =
    <div className={ s.actions }>
      <button className={ s['button--alt'] } onClick={ props.onClose }>Close
      </button>
      { hasItems &&
        <button className={ s.button } onClick={ orderHandler }>Order</button> }
    </div>;

  const cartModalContent = <> { cartItems };
    <div className={ s.total }>
      <span>Total Amount</span>
      <span>{ totalAmount }</span>
    </div>;
    {
      isCheckout ?
        <Checkout
          onConfirm={ submitOrderHandler }
          onCancel={ props.onClose }
        />
        : modalActions
    }
  </>;

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = <>
    <p>Successfully sent the order!</p>
    <div className={ s.actions }>
      <button className={ s.button } onClick={ props.onClose }>
        Close
      </button>
    </div>
  </>;

  return <Modal onClose={ props.onClose }>
    { !isSubmitting && !didSubmit && cartModalContent }
    { isSubmitting && isSubmittingModalContent }
    { !isSubmitting && didSubmit && didSubmitModalContent }
  </Modal>;
};

export default Cart;