import React, { useState, useEffect } from 'react';
import AddFood from '../components/AddFood.jsx';
import TotalsDisplay from '../components/TotalsDisplay.jsx';
import FoodStats from '../components/FoodStats.jsx';

const MainContainer = () => {
  return (
    <div>
      <div>
        <h1>Calorie Tracker</h1>
        <TotalsDisplay />
        <AddFood />
        <FoodStats />
      </div>
      <div>{/* <GraphContainer /> */}</div>
    </div>
  );
};

export default MainContainer;
