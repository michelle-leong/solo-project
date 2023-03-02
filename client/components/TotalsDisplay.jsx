import React, { useContext } from 'react';
import { FoodContext } from '../context/FoodContext.js';

const TotalsDisplay = () => {
  const { totalFoodInfo, showGraph, setShowGraph } = useContext(FoodContext);

  const handleClick = () => {
    setShowGraph(showGraph === false ? true : false);
  };

  return (
    <div id='totals-display'>
      <ul>
        <li>
          <span>Calories:</span> {totalFoodInfo.calories.toFixed(2)} cal
        </li>
        <li>
          <span>Cholesterol:</span> {totalFoodInfo.cholesterol.toFixed(2)} mg
        </li>
        <li>
          <span>Total Carbohydrates:</span>{' '}
          {totalFoodInfo.totalCarbohydrates.toFixed(2)} g
        </li>
        <li>
          <span>Total Fat:</span> {totalFoodInfo.totalFat.toFixed(2)} g
        </li>
        <li>
          <span>Protein:</span> {totalFoodInfo.protein.toFixed(2)} oz
        </li>
        <li>
          <button id='serving' onClick={handleClick}>
            Total Servings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TotalsDisplay;
