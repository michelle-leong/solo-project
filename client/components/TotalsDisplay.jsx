import React from 'react';

const TotalsDisplay = (props) => (
  <div>
    <ul id='totals-display'>
      <li>Calories: {props.calories}</li>
      <li>Total Fat: {props.totalFat}g</li>
      <li>Saturated Fat: {props.saturatedFat}g</li>
      <li>Protein: {props.protein}oz</li>
      <li>Sodium: {props.sodium}mg</li>
      <li>Cholesterol: {props.cholesterol}mg</li>
      <li>Total Carbs: {props.totalCarbs}g</li>
      <li>Sugar: {props.sugar}g</li>
    </ul>
  </div>
);

export default TotalsDisplay;
