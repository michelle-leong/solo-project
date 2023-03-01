const fetch = require('node-fetch');

const FoodController = {
  fetchFood(req, res, next) {
    const { name, amount } = req.body;
    //do the + thing with the amount + name
    fetch(`https://api.api-ninjas.com/v1/nutrition?query=${amount}+${name}`, {
      headers: { 'X-Api-Key': 'NeUce5dyLoNICXBpT1G75Q==R4ofZnj7TNhI5NZi' },
    })
      .then((data) => data.json())
      .then((data) => {
        res.locals.food = data[0];
        return next();
      })
      .catch((err) => {
        return next({
          log: 'Error occurred in foodController.fetchFood',
          message: { err: `Error in foodController.fetchFood ${err}` },
        });
      });
  },

  fetchServingSize(req, res, next) {
    const name = req.body.name;

    fetch(`https://api.api-ninjas.com/v1/nutrition?query=1+serving+${name}`, {
      headers: { 'X-Api-Key': 'NeUce5dyLoNICXBpT1G75Q==R4ofZnj7TNhI5NZi' },
    })
      .then((data) => data.json())
      .then((data) => {
        res.locals.servingSize = data[0]['serving_size_g'];
        return next();
      })
      .catch((err) => {
        return next({
          log: 'Error occurred in foodController.fetchServingSize',
          message: {
            err: `Error in foodController.fetchServingSize ${err}`,
          },
        });
      });
  },

  // fetchUpdatedServing(req, res, next) {
  //   const amount = req.params.name;

  //   fetch(`https://api.api-ninjas.com/v1/nutrition?query=1+serving+${name}`, {
  //     headers: { 'X-Api-Key': 'NeUce5dyLoNICXBpT1G75Q==R4ofZnj7TNhI5NZi' },
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       res.locals.servingSize = data[0]['serving_size_g'];
  //       return next();
  //     })
  //     .catch((err) => {
  //       return next({
  //         log: 'Error occurred in foodController.fetchServingSize',
  //         message: {
  //           err: `Error in foodController.fetchServingSize ${err}`,
  //         },
  //       });
  //     });
  // },
};

module.exports = FoodController;
