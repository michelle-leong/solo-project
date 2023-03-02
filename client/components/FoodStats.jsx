import React, { useEffect } from 'react';
import { useFoodContext } from '../hooks/useFoodContext';
import DataTable from 'react-data-table-component';

const FoodStats = () => {
  const { foodList, dispatch } = useFoodContext();

  const columns = [
    { name: 'Name', selector: (row) => row.name },
    { name: 'Food Group', selector: (row) => row.foodGroup },
    { name: 'Amount Eaten', selector: (row) => row.amountEaten },
    { name: 'Calories', selector: (row) => row.calories },
    { name: 'Total Fat (g)', selector: (row) => row.totalFat },
    { name: 'Saturated Fat (g)', selector: (row) => row.saturatedFat },
    { name: 'Protein (g)', selector: (row) => row.protein },
    { name: 'Sodium (mg)', selector: (row) => row.sodium },
    { name: 'Cholesterol (mg)', selector: (row) => row.cholesterol },
    { name: 'Total Carbs (g)', selector: (row) => row.totalCarbohydrates },
    { name: 'Sugar (g)', selector: (row) => row.sugar },
    { name: 'Serving Size (g)', selector: (row) => row.servingSize },
    { name: 'Servings Eaten', selector: (row) => row.numberServings },
  ];

  const customStyles = {
    responsiveWrapper: {
      style: {},
    },
    rows: {
      style: {
        maxheight: '50px',
      },
    },
    headRow: {
      style: {
        paddingLeft: '0px',
        paddingRight: '0px',
        fontSize: '16px',
      },
    },
    cells: {
      style: {
        paddingLeft: '0px',
        paddingRight: '0px',
        fontSize: '15px',
      },
    },
    progress: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch('http://localhost:3000/api');
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        dispatch({ type: 'SET_FOOD', payload: parsedResponse });
      } catch (err) {
        console.log(err);
      }
    };
    fetchFood();
  }, []);

  return (
    <div>
      <h1>food</h1>
      <DataTable
        columns={columns}
        data={foodList}
        customStyles={customStyles}
        dense
      />
    </div>
  );
};

export default FoodStats;
