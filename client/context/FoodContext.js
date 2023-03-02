import React, { createContext, useReducer, useState } from 'react';

export const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [totalFoodInfo, setTotalFoodInfo] = useState({
    calories: 0,
    cholesterol: 0,
    totalFat: 0,
    sugar: 0,
    fruit: 0,
    grain: 0,
    vegetable: 0,
    protein: 0,
    dairy: 0,
  });

  return (
    <FoodContext.Provider
      value={{ foodList, setFoodList, totalFoodInfo, setTotalFoodInfo }}
    >
      {children}
    </FoodContext.Provider>
  );
};
