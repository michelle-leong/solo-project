const path = require('path');
const express = require('express');
const FoodController = require(path.resolve(
  './server/controllers/FoodController.js'
));
const DatabaseController = require(path.resolve(
  './server/controllers/DatabaseController'
));
const ServingsController = require(path.resolve(
  './server/controllers/ServingsController'
));

const router = express.Router();

router.get(
  '/',
  DatabaseController.getFood,
  ServingsController.getServings,
  (req, res) => {
    return res
      .status(200)
      .json({ food: res.locals.allFood, servings: res.locals.servingTotals });
  }
);

router.post(
  '/nutrients',
  FoodController.fetchFood,
  FoodController.fetchServingSize,
  DatabaseController.saveFood,
  ServingsController.saveServings,
  (req, res) => {
    return res.status(200).json(res.locals.created);
  }
);

router.delete(
  '/item',
  DatabaseController.deleteItem,
  // ServingsController.deleteServing,
  (req, res) => {
    return res.status(200).send('hello');
  }
);

router.delete(
  '/reset',
  DatabaseController.resetFood,
  // ServingsController.resetServing,
  (req, res) => {
    return res.status(200).send('deleted food');
  }
);

module.exports = router;
