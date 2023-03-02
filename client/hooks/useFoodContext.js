import { FoodContext } from '../context/FoodContext';
import { useContext } from 'react';

export const useFoodContext = () => {
  const context = useContext(FoodContext);

  if (!context) {
    throw Error('useFoodContext must be used inside a FoodContextProvider');
  }
  return context;
};
