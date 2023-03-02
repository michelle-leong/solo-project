import React, { useState, useContext } from 'react';
import DropdownMenu from '/client/components/DropdownMenu.jsx';
import { FoodContext } from '../context/FoodContext.js';

const AddFood = () => {
  const { setFoodList, setTotalFoodInfo, setTotalServings, foodList } =
    useContext(FoodContext);
  const [state, setState] = useState({
    amount: '',
    foodName: '',
    foodGroup: 'dairy',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const submitFood = async (e) => {
    e.preventDefault();

    const data = {};

    for (let key in state) {
      if (key === 'amount' || key === 'foodName') {
        if (state[key].includes(' ')) {
          data[key] = state[key].split(' ').join('+');
        } else if (state[key].includes('/')) {
          data[key] = state[key].split('/').join('%2F');
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

    setFoodList((oldState) => {
      const copy = [...oldState];
      copy.push(parsedResult);
      return copy;
    });

    setTotalFoodInfo((oldState) => {
      const copy = { ...oldState };
      for (let key in copy) {
        copy[key] += parsedResult[key];
      }
      return copy;
    });

    setTotalServings((oldState) => {
      const copy = { ...oldState };
      if (parsedResult.foodGroup === 'protein')
        copy.protein += parsedResult.protein;
      else copy[parsedResult.foodGroup] += parsedResult.numberServings;

      return copy;
    });

    setState({
      ...state,
      amount: '',
      foodName: '',
    });
  };

  const resetFood = async () => {
    await fetch('http://localhost:3000/api/reset', {
      method: 'DELETE',
    });
    setFoodList([]);
    setTotalFoodInfo({
      calories: 0,
      cholesterol: 0,
      totalFat: 0,
      totalCarbohydrates: 0,
      protein: 0,
    });
    setTotalServings({
      dairy: 0,
      fruit: 0,
      grain: 0,
      protein: 0,
      vegetable: 0,
    });
  };

  return (
    <div id='add-food-container'>
      <h2>Add Food</h2>
      <div id='add-food'>
        <label>
          Amount:
          <input
            type='text'
            name='amount'
            id='amount'
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
        <button
          id='submit'
          onClick={submitFood}
          disabled={!state.amount || !state.foodName}
        >
          Submit
        </button>
        <button id='reset' onClick={resetFood} disabled={!foodList.length}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default AddFood;
