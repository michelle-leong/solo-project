import React, { useState, useContext } from 'react';
import DropdownMenu from '/client/components/DropdownMenu.jsx';
import { FoodContext } from '../context/FoodContext.js';

const AddFood = () => {
  const { setFoodList, setTotalFoodInfo } = useContext(FoodContext);
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

    const parsedResult = await result.json();

    console.log(parsedResult);
    setFoodList((oldState) => {
      const copy = [...oldState];
      copy.push(parsedResult);
      return copy;
    });

    setTotalFoodInfo((oldState) => {
      const copy = { ...oldState };
      console.log('copy', copy);
      console.log('foodGroup', parsedResult.foodGroup);
      console.log('number servings', parsedResult.numberServings);
      for (let key in copy) {
        if (key === parsedResult.foodGroup) {
          copy[key] += parsedResult.numberServings;
        } else {
          copy[key] += parsedResult[key];
        }
      }
      return copy;
    });

    setState({
      ...state,
      amount: '',
      foodName: '',
    });
  };

  const resetFood = async () => {
    const result = await fetch('http://localhost:3000/api/reset', {
      method: 'DELETE',
    });
    setFoodList([]);
  };

  return (
    <div>
      <h2>Add Food</h2>
      <label>
        Amount:
        <input
          type='text'
          name='amount'
          onChange={handleChange}
          value={state.amount}
        />
      </label>
      <label>
        Food Name:
        <input
          type='text'
          name='foodName'
          onChange={handleChange}
          value={state.foodName}
        />
      </label>
      <DropdownMenu change={handleChange} />
      <button onClick={submitFood}>Submit</button>
      <button onClick={resetFood}>Reset</button>
    </div>
  );
};

export default AddFood;
