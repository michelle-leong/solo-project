import React, { createContext, useState } from 'react';

export const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [totalFoodInfo, setTotalFoodInfo] = useState({
    calories: 0,
    cholesterol: 0,
    totalFat: 0,
    totalCarbohydrates: 0,
    protein: 0,
  });

  const [totalServings, setTotalServings] = useState({
    dairy: 0,
    fruit: 0,
    grain: 0,
    protein: 0,
    vegetable: 0,
  });

  return (
    <FoodContext.Provider
      value={{
        foodList,
        setFoodList,
        totalFoodInfo,
        setTotalFoodInfo,
        totalServings,
        setTotalServings,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
