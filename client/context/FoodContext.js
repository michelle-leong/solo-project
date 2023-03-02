import React, { createContext, useReducer } from 'react';

export const FoodContext = createContext();

export const foodReducer = (state, action) => {
  switch (action.type) {
    //setting foodlist
    case 'SET_FOOD':
      return {
        foodList: action.payload,
        totalCalories: state.totalCalories + action.payload.calories,
        totalCholesterol: state.totalCholesterol + action.payload.cholesterol,
        totalSugar: state.totalSugar + action.payload.sugar,
      };

    // case 'ADD_FOOD':
    //   return {};

    // case 'DELETE_FOOD':
    //   return {
    //     foodList: [],
    //   };
    // case 'RESET_FOOD':
    //   return {
    //     foodList: [],
    //   };
    default:
      return state;
  }
};
export const FoodContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(foodReducer, {
    foodList: [],
    totalCalories: 0,
    totalCholesterol: 0,
    totalSugar: 0,
    fruitServings: 0,
    grainServings: 0,
    vegetableServings: 0,
    proteinSerivings: 0,
    dairyServings: 0,
  });

  return (
    <FoodContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FoodContext.Provider>
  );
};
