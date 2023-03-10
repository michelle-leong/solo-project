const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, required: true },
  foodGroup: { type: String, required: true },
  amountEaten: { type: String, required: true },
  calories: { type: Number, required: true },
  totalFat: { type: Number, required: true },
  saturatedFat: { type: Number, required: true },
  protein: { type: Number, required: true },
  sodium: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  totalCarbohydrates: { type: Number, required: true },
  sugar: { type: Number, required: true },
  servingSize: { type: Number, required: true },
  numberServings: { type: Number, required: true },
});

module.exports = mongoose.model('food', foodSchema);
