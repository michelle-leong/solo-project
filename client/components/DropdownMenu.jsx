import React, { useState } from 'react';

const DropdownMenu = (props) => {
  const options = [
    { label: 'Dairy', value: 'dairy' },
    { label: 'Fruit', value: 'fruit' },
    { label: 'Grain', value: 'grain' },
    { label: 'Protein', value: 'protein' },
    { label: 'Vegetable', value: 'vegetable' },
  ];

  return (
    <div>
      <label>
        Food Group:
        <select name='foodGroup' id='dropdown' onChange={props.change}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DropdownMenu;
