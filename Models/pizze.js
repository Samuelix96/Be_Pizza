/** @format */

const mongoose = require('mongoose');

const PizzeSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('PizzeModel', PizzeSchema, 'pizze');
