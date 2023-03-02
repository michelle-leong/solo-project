import React, { useEffect } from 'react';

const TotalsDisplay = (props) => {
  // useEffect(() => {});

  return (
    <div>
      <ul id='totals-display'>
        <li>Calories: {props.calories}</li>
        <li>Total Fat: {props.totalFat}g</li>
        <li>Protein: {props.protein}oz</li>
        <li>Sodium: {props.sodium}mg</li>
        <li>Cholesterol: {props.cholesterol}mg</li>
      </ul>
    </div>
  );
};

export default TotalsDisplay;
