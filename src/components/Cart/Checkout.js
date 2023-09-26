import s from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = val => val.trim() === '';
const isFiveChars = val => val.trim().length === 5;
const buildControlClasses = (
  controlClasses, inputFields, formInputValidity) => {
  inputFields.forEach(field => {
    controlClasses[field] = `${ s.control } ${ formInputValidity[field]
      ? ''
      : s.invalid }`;
  });
};

const Checkout = (props) => {
  // Quick Validation, not the best
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const inputRefs = {
    name: useRef(),
    street: useRef(),
    postalCode: useRef(),
    city: useRef(),
  };

  const confirmHandler = (e) => {
    e.preventDefault();

    const getInputValidity = (field, validator = (value) => !isEmpty(value)) =>
      validator(inputRefs[field].current.value);

    const inputValidity = {
      name: getInputValidity('name'),
      street: getInputValidity('street'),
      city: getInputValidity('city'),
      postalCode: getInputValidity('postalCode', isFiveChars),
    };

    setFormInputValidity(inputValidity);

    const formIsValid = Object.values(inputValidity).every(Boolean);
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: inputRefs.name.current.value,
      street: inputRefs.street.current.value,
      city: inputRefs.city.current.value,
      postalCode: inputRefs.postalCode.current.value,
    });
  };

  const controlClasses = {};
  buildControlClasses(controlClasses, ['name', 'street', 'postalCode', 'city'],
    formInputValidity);

  return (
    <form className={ s.form } onSubmit={ confirmHandler }>
      <div className={ controlClasses.name }>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={ inputRefs.name }/>
        { !formInputValidity.name && <p>Please enter a valid name!</p> }
      </div>
      <div className={ controlClasses.street }>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={ inputRefs.street }/>
        { !formInputValidity.street && <p>Please enter a valid street!</p> }
      </div>
      <div className={ controlClasses.postalCode }>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={ inputRefs.postalCode }/>
        { !formInputValidity.postalCode &&
          <p>Please enter a valid postal code (5 characters long)!</p> }
      </div>
      <div className={ controlClasses.city }>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={ inputRefs.city }/>
        { !formInputValidity.city && <p>Please enter a valid city!</p> }
      </div>
      <div className={ s.actions }>
        <button type="button" onClick={ props.onCancel }>
          Cancel
        </button>
        <button className={ s.submit }>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;