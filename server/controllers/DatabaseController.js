const Food = require('../models/foodModel');
const ObjectId = require('mongoose').Types.ObjectId;

const DatabaseController = {
  getFood(req, res, next) {
    Food.find({})
      .exec()
      .then((data) => {
        res.locals.allFood = data;
        return next();
      });
  },

  saveFood(req, res, next) {
    const foodGroup = req.body.foodGroup;
    const {
      name,
      calories,
      serving_size_g,
      fat_total_g,
      fat_saturated_g,
      protein_g,
      sodium_mg,
      cholesterol_mg,
      carbohydrates_total_g,
      sugar_g,
    } = res.locals.food;
    const servingSize = res.locals.servingSize;
    const numberServings = serving_size_g / servingSize;
    const amountEaten = res.locals.amount;
    Food.create({
      name,
      amountEaten,
      foodGroup,
      calories,
      totalFat: fat_total_g,
      saturatedFat: fat_saturated_g,
      protein: protein_g,
      sodium: sodium_mg,
      cholesterol: cholesterol_mg,
      totalCarbohydrates: carbohydrates_total_g,
      sugar: sugar_g,
      servingSize,
      numberServings,
    })
      .then((food) => {
        res.locals.created = food;
        return next();
      })
      .catch((err) => {
        return next({
          log: 'Error occurred in databaseController.saveFood',
          message: {
            err: `Error in databaseController.saveFood ${err}`,
          },
        });
      });
  },

  // updateFood(req, res, next) {
  //   const foodItem = req.params.id; //bruh how do i access the id
  //   const newAmount = req.query.serving;
  //   let serving;
  //   Food.findOne({ name: foodItem }, 'servingSize', (err, servingSize) => {
  //     serving = servingSize;
  //   });

  //   const numberServings = newAmount / serving;
  //   Food.updateOne({ name: foodItem }, { numberServings: numberServings }, (err) => {
  //     if (err) {
  //       return next({
  //         log: 'studentController.updateStudent',
  //         message: {
  //           err: 'studentController.updateStudent, student not found ',
  //         },
  //       });
  //     }
  //   });
  // },

  deleteItem(req, res, next) {
    const foodId = req.body._id; //how to access that entry
    Food.findByIdAndRemove(foodId)
      .then(() => {
        return next();
      })
      .catch((err) => {
        return next({
          log: 'DatabaseController.deleteFood',
          message: {
            err: 'DatabaseController.deleteFood' + err,
          },
        });
      });
  },

  resetFood(req, res, next) {
    Food.deleteMany({})
      .then(() => {
        return next();
      })
      .catch((err) => {
        return next({
          log: 'DatabaseController.resetFood',
          message: {
            err: 'DatabaseController.resetFood',
          },
        });
      });
  },
};

module.exports = DatabaseController;
