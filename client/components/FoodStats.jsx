import React, { useEffect } from 'react';
import { useFoodContext } from '../hooks/useFoodContext';

const FoodStats = () => {
  const { foodList, dispatch } = useFoodContext();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch('http://localhost:3000/api');
        const parsedResponse = await response.json();
        dispatch({ type: 'SET_FOOD', payload: parsedResponse.food });
      } catch (err) {
        console.log(err);
      }
    };
    fetchFood();
  }, []);

  const mappedList = foodList.map((item) => {
    return [
      <tr>
        <td>{item.name}</td>
        <td>{item.foodGroup}</td>
        <td>{item.amountEaten}</td>
        <td>{item.calories}</td>
        <td>{item.totalFat}</td>
        <td>{item.saturatedFat}</td>
        <td>{item.protein}</td>
        <td>{item.sodium}</td>
        <td>{item.cholesterol}</td>
        <td>{item.totalCarbohydrates}</td>
        <td>{item.sugar}</td>
        <td>{item.servingSize}</td>
        <td>{item.numberServings}</td>
        <td>
          <button>X</button>
        </td>
      </tr>,
    ];
  });
  console.log(mappedList);

  return (
    <div>
      <h1>food</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Food Group</th>
            <th>Amount Eaten</th>
            <th>Calories</th>
            <th>Total Fat (g)</th>
            <th>Saturated Fat (g)</th>
            <th>Protein (g)</th>
            <th>Sodium (mg)</th>
            <th>Cholesterol (mg)</th>
            <th>Total Carbs (g)</th>
            <th>Sugar (g)</th>
            <th>Serving Size(g) </th>
            <th>Servings Eaten</th>
            <th>Delete Item</th>
          </tr>
        </thead>
        <tbody>{mappedList}</tbody>
      </table>
    </div>
  );
};

export default FoodStats;
