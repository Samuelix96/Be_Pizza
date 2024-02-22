/** @format */

const mongoose = require('mongoose');

const FriedsSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('FriedsModel', FriedsSchema, 'frieds');
