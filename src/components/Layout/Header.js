import mealsImage from '../../assets/meals.jpg';
import s from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
  return (
    <>
      <header className={ s.header }>
        <h1>
          ReactMeals
        </h1>
        <HeaderCartButton onClick={ props.onShowCart }/>
      </header>
      <div className={ s['main-image'] }>
        <img src={ mealsImage } alt="A table fool of delicious food"/>
      </div>
    </>
  );
};

export default Header;