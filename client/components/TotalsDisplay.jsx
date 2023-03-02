import React, { useContext, useState } from 'react';
import { FoodContext } from '../context/FoodContext.js';
import GraphContainer from '../containers/GraphContainer.jsx';

const TotalsDisplay = () => {
  const { totalFoodInfo } = useContext(FoodContext);
  const [show, setShow] = useState({ div: '' });
  const handleHover = () => {
    setShow(show === false ? true : false);
  };

  const handleLeave = () => {
    setShow({ likeList: '' });
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
          <span id='serving'>Total Servings </span>
          <div id='graph-display'>
            <GraphContainer />
          </div>
        </li>
      </ul>
      {/* <div id='graph-display'>{show === true ? <GraphContainer /> : ''}</div> */}
    </div>
  );
};

export default TotalsDisplay;
