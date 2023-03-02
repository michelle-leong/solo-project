import React, { useState } from 'react';
import DropdownMenu from '/client/components/DropdownMenu.jsx';
import { useFoodContext } from '../hooks/useFoodContext.js';

const AddFood = () => {
  const { foodList, dispatch } = useFoodContext();
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

    const updatedList = await fetch('http://localhost:3000/api');
    const parsedResponse = await updatedList.json();
    dispatch({ type: 'SET_FOOD', payload: parsedResponse });

    setState({
      ...state,
      amount: '',
      foodName: '',
    });
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
    </div>
  );
};

export default AddFood;
