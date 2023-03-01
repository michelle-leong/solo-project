import React, { useState } from 'react';
import DropdownMenu from '/client/components/DropdownMenu.jsx';

const AddFood = (props) => {
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
    // console.log(data);
    // console.log(JSON.stringify(data));

    const result = await fetch('http://localhost:3000/api/nutrients', {
      method: 'POST',
      // mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // const jsonResult = await result.json();
  };

  return (
    <div>
      <h2>Add Food</h2>
      <label>
        Amount:
        <input type='text' name='amount' onChange={handleChange} />
      </label>
      <label>
        Food Name:
        <input type='text' name='foodName' onChange={handleChange} />
      </label>
      <DropdownMenu change={handleChange} />
      <button onClick={submitFood}>Submit</button>
    </div>
  );
};

export default AddFood;
