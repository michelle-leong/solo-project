import React, { useState, useEffect } from 'react';
import AddFood from '../components/AddFood.jsx';
// import TotalsDisplay from '../components/TotalsDisplay.jsx';
import FoodStats from '../components/FoodStats.jsx';

const MainContainer = () => {
  const [state, setState] = useState({
    amount: '',
    foodName: '',
    foodGroup: 'fruit',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
    console.log(e.target.name, value);
  };

  const submitFood = async () => {
    const data = {};

    for (let key in state) {
      if (key === 'amount' || key === 'foodName') {
        if (state[key].includes(' ')) {
          data[key] = state[key].split(' ').join('+');
        } else {
          data[key] = state[key];
        }
      } else {
        data[key] = state[key];
      }
    }

    const result = await fetch('http://localhost:3000/api/nutrients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setState({
      ...state,
      amount: '',
      foodName: '',
      // allFood: [...allFood, data],
    });
  };

  return (
    <div>
      <div>
        <h1>Calorie Tracker</h1>
        {/* <TotalsDisplay /> */}
        <AddFood
          amount={state.amount}
          foodName={state.foodName}
          foodGroup={state.foodGroup}
          changeState={handleChange}
          submit={submitFood}
        />
        <FoodStats allFood={state.allFood} />
      </div>
      <div>{/* <GraphContainer /> */}</div>
    </div>
  );
};

export default MainContainer;
