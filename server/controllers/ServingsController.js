const Serving = require('../models/foodGroupsModel');

const ServingsController = {
  getServings(req, res, next) {
    Serving.find({})
      .exec()
      .then((data) => {
        res.locals.servingTotals = data;
        return next();
      });
  },

  saveServings(req, res, next) {
    console.log('food group', req.body.foodGroup);
    Serving.findOneAndUpdate(
      { type: req.body.foodGroup },
      { $inc: { servings: res.locals.numberServings } },
      { upsert: true, new: true }
    )
      .then(() => {
        console.log('success');
        return next();
      })
      .catch((err) => {
        if (err) {
          return next({
            log: 'Error occurred in ServingsController.saveServings',
            message: {
              err: `Error in ServingsController.saveServings ${err}`,
            },
          });
        }
      });
  },

  deleteServing(req, res, next) {
    Serving.findOneAndUpdate(
      { type: res.locals.deleteFoodGroup },
      { $inc: { servings: -res.locals.deleteServings } }
    )
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
    Serving.deleteMany({})
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

module.exports = ServingsController;
