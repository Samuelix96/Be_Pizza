/** @format */

const express = require('express');
const AdvModel = require('../Models/adv');
const adv = express.Router();

adv.get('/adv', async (req, res) => {
  try {
    const advs = await AdvModel.find();

    res.status(200).send({
      statusCode: 200,
      message: 'Get successfully',
      advs,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});

adv.post('/adv/create', async (req, res) => {
  const newAdv = new AdvModel({
    img: req.body.img,
    title: req.body.title,
    subtitle: req.body.subtitle,
  });

  try {
    const advs = newAdv.save();

    res.status(200).send({
      statusCode: 200,
      message: 'Post Successfully',
      advs,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});

adv.patch('/adv/update/:id', async (req, res) => {
  const { id } = req.params;

  const advExist = await AdvModel.findById(id);
  if (!advExist) {
    return res.status(404).send({
      statusCode: 404,
      message: `Adv not find with this id ${id}`,
    });
  }

  try {
    const updateAdv = req.body;
    const option = { new: true };
    const adv = await AdvModel.findByIdAndUpdate(id, updateAdv, option);

    res.status(200).send({
      statusCode: 200,
      adv,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});

module.exports = adv;
