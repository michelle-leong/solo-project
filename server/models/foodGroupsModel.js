const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const servingsSchema = new Schema({
  type: { type: String, required: true },
  servings: { type: Number, required: true },
});

module.exports = mongoose.model('serving', servingsSchema);
