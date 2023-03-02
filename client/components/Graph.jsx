import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FoodContext } from '../context/FoodContext';

Chart.register(...registerables);

const Graph = () => {
  const { totalServings } = useContext(FoodContext);
  const suggested = {
    dairy: 3,
    fruit: 2,
    grain: 6,
    protein: 5,
    vegetable: 2.5,
  };
  const percentages = {};
  for (let key in totalServings) {
    percentages[key] = (totalServings[key] / suggested[key]).toFixed(2) * 100;
  }
  console.log(percentages);

  const chartData = {
    labels: ['Dairy', 'Fruit', 'Grains', 'Protein', 'Vegetables'],
    datasets: [
      {
        label: 'Servings',
        data: Object.values(percentages),
        backgroundColor: [
          '#B3E5FC',
          '#4FC3F7',
          '#03A9F4',
          '#0288D1',
          '#0277BD',
        ],
      },
    ],
  };

  return (
    <div>
      <Bar
        data={chartData}
        width={'600px'}
        height={'400px'}
        options={{
          responsive: true,

          plugins: {
            title: { display: true, text: '% suggested servings' },
            legend: { display: false },
          },
        }}
      />
    </div>
  );
};

export default Graph;
