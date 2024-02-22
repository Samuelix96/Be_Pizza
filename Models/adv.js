/** @format */

const mongoose = require('mongoose');

const AdvSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('AdvModel', AdvSchema, 'adv');
