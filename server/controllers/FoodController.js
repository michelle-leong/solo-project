const fetch = require('node-fetch');

const FoodController = {
  fetchFood(req, res, next) {
    // console.log('body', req.body);
    const { foodName, amount } = req.body;
    console.log('name', foodName, 'amount', amount);
    // res.locals.name = name;
    fetch(
      `https://api.api-ninjas.com/v1/nutrition?query=${amount}+${foodName}`,
      {
        headers: { 'X-Api-Key': 'NeUce5dyLoNICXBpT1G75Q==R4ofZnj7TNhI5NZi' },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        res.locals.food = data[0];
        console.log('food', res.locals.food);
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
    const { foodName } = req.body;

    fetch(
      `https://api.api-ninjas.com/v1/nutrition?query=1+serving+${foodName}`,
      {
        headers: { 'X-Api-Key': 'NeUce5dyLoNICXBpT1G75Q==R4ofZnj7TNhI5NZi' },
      }
    )
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
