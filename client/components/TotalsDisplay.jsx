import React, { useContext, useEffect } from 'react';
import { FoodContext } from '../context/FoodContext.js';

const TotalsDisplay = () => {
  const { totalFoodInfo } = useContext(FoodContext);

  return (
    <div>
      <ul id='totals-display'>
        <li>Calories: {totalFoodInfo.calories}</li>
        <li>Cholesterol: {totalFoodInfo.cholesterol}mg</li>
        <li>Total Fat: {totalFoodInfo.totalFat}g</li>
        <li>Protein: {totalFoodInfo.protein}oz</li>
      </ul>
    </div>
  );
};

export default TotalsDisplay;
