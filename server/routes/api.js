const path = require('path');
const express = require('express');
const FoodController = require(path.resolve(
  './server/controllers/FoodController.js'
));
const DatabaseController = require(path.resolve(
  './server/controllers/DatabaseController'
));

const router = express.Router();

router.get('/', DatabaseController.getFood, (req, res) => {
  return res.status(200).json(res.locals.allFood);
});

router.post(
  '/nutrients',
  FoodController.fetchFood,
  FoodController.fetchServingSize,
  DatabaseController.saveFood,
  (req, res) => {
    return res.status(200).json(res.locals.created);
  }
);

router.delete('/delete', DatabaseController.deleteItem, (req, res) => {
  return res.status(200).json(res.locals.deletedItem);
});

router.delete('/reset', DatabaseController.resetFood, (req, res) => {
  return res.status(200).send('deleted food');
});

module.exports = router;
