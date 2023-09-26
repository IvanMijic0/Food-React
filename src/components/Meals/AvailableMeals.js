import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import s from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        'https://food-order-a2f65-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await res.json();
      const loadedMeals = [];

      for (const key in resData) {
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().
      then(() => console.log('Successfully fetched meals!')).
      catch(err => {
        setIsLoading(false);
        setHttpError(err.message);
      });

  }, []);

  if (isLoading) {
    return <section className={ s.MealsLoading }>
      <p>Loading...</p>
    </section>;
  }

  if (httpError) {
    return <section className={ s.MealsError }>
      <p>{ httpError }</p>
    </section>;
  }

  const mealsList = meals.map(meal =>
    <MealItem
      id={ meal.id }
      key={ meal.id }
      name={ meal.name }
      description={ meal.description }
      price={ meal.price }
    />,
  );

  return <section className={ s.meals }>
    <Card>
      <ul>
        { mealsList }
      </ul>
    </Card>
  </section>;

};

export default AvailableMeals;