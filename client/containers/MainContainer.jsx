import React, { useContext } from 'react';
import { FoodContext } from '../context/FoodContext.js';
import AddFood from '../components/AddFood.jsx';
import TotalsDisplay from '../components/TotalsDisplay.jsx';
import FoodStats from '../components/FoodStats.jsx';
import GraphContainer from './GraphContainer.jsx';

const MainContainer = () => {
  const { showGraph } = useContext(FoodContext);
  return (
    <div>
      <div id='main-container'>
        <h1>Calorie Tracker</h1>
        <TotalsDisplay />
        {showGraph === true ? <GraphContainer /> : null}
        <AddFood />
        <FoodStats />
      </div>
    </div>
  );
};

export default MainContainer;
