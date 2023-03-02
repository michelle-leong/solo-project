import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { FoodContextProvider } from '../client/context/FoodContext';

render(
  <FoodContextProvider>
    <App />
  </FoodContextProvider>,
  document.getElementById('root')
);
