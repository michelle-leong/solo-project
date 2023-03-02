import React, { useEffect, useContext, useState } from 'react';
import { FoodContext } from '../context/FoodContext';

const FoodStats = () => {
  const { foodList, setFoodList, totalFoodInfo, setTotalFoodInfo } =
    useContext(FoodContext);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch('http://localhost:3000/api');
        const parsedResponse = await response.json();
        setFoodList(parsedResponse);

        const copy = { ...totalFoodInfo };
        console.log(copy);
        parsedResponse.forEach((item) => {
          for (let key in copy) {
            if (key === item.foodGroup) {
              copy[key] += item.numberServings.toFixed(2);
            } else {
              copy[key] += item[key];
            }
          }
        });
        setTotalFoodInfo(copy);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFood();
  }, []);

  const deleteFood = async (foodId) => {
    const response = await fetch('http://localhost:3000/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: foodId }),
    });

    const parsedResponse = await response.json();

    setFoodList((oldState) => {
      return oldState.filter(({ _id }) => {
        return _id !== foodId;
      });
    });

    setTotalFoodInfo((oldState) => {
      const copy = { ...oldState };
      for (let key in oldState) {
        copy[key] -= parsedResponse[key];
      }
      return copy;
    });
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const sortList = (field) => {
    let direction = 'ascending';
    if (sortConfig.key === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: field, direction });

    let sortedProducts = [...foodList];
    sortedProducts.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFoodList(sortedProducts);
  };

  const mappedList = foodList.map((item) => {
    return [
      <tr>
        <td>{item.name}</td>
        <td>{item.foodGroup}</td>
        <td>{item.amountEaten}</td>
        <td>{item.servingSize}</td>
        <td>{item.numberServings}</td>
        <td>{item.calories}</td>
        <td>{item.totalFat}</td>
        <td>{item.saturatedFat}</td>
        <td>{item.protein}</td>
        <td>{item.sodium}</td>
        <td>{item.cholesterol}</td>
        <td>{item.totalCarbohydrates}</td>
        <td>{item.sugar}</td>
        <td>
          <button
            onClick={() => {
              deleteFood(item._id);
            }}
          >
            X
          </button>
        </td>
      </tr>,
    ];
  });

  return (
    <div id='food-stats'>
      <table>
        <thead>
          <tr>
            <th>
              <button type='button' onClick={() => sortList('name')}>
                Name
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('foodGroup')}>
                Food Group
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('amountEaten')}>
                Amount Eaten{' '}
              </button>
            </th>
            <th>Serving Size(g) </th>
            <th>
              <button type='button' onClick={() => sortList('numberServings')}>
                Servings Eaten
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('calories')}>
                Calories
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('totalFat')}>
                Total Fat (g)
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('saturatedFat')}>
                Saturated Fat (g)
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('protein')}>
                Protein (g)
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('sodium')}>
                Sodium (mg)
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('cholesterol')}>
                Cholesterol (mg)
              </button>
            </th>
            <th>
              <button
                type='button'
                onClick={() => sortList('totalCarbohydrates')}
              >
                Total Carbs (g)
              </button>
            </th>
            <th>
              <button type='button' onClick={() => sortList('sugar')}>
                Sugar (g)
              </button>
            </th>

            <th>Delete Item</th>
          </tr>
        </thead>
        <tbody>{mappedList}</tbody>
      </table>
    </div>
  );
};

export default FoodStats;
