import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import s from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
  const cartCtx = useContext(CartContext);

  const price = `$${ props.price.toFixed(2) }`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={ s.meal }>
      <div>
        <h3>{ props.name }</h3>
        <div className={ s.description }>{ props.description }</div>
        <div className={ s.price }>{ price }</div>
      </div>
      <div>
        <MealItemForm id={ props.id } onAddToCart={ addToCartHandler }/>
      </div>
    </li>
  );
};

export default MealItem;