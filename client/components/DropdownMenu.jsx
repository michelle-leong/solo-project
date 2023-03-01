import React, { useState } from 'react';

const DropdownMenu = (props) => {
  const options = [
    { label: 'Fruit', value: 'fruit' },
    { label: 'Vegetable', value: 'vegetable' },
    { label: 'Grain', value: 'grain' },
    { label: 'Protein', value: 'protein' },
    { label: 'Dairy', value: 'dairy' },
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
