import React, { createContext, useReducer } from 'react';

export const FoodContext = createContext();

export const foodReducer = (state, action) => {
  switch (action.type) {
    //setting foodlist
    case 'SET_FOOD':
      return {
        foodList: action.payload,
      };

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
  });

  return (
    <FoodContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FoodContext.Provider>
  );
};
