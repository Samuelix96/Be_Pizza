/** @format */

const express = require('express');
const DrinksModel = require('../Models/drinks');
const drinks = express.Router();

drinks.get('/drinks', async (req, res) => {
  try {
    const drink = await DrinksModel.find();
    if (!drink) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Error in Get drink',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Get successfuly',
      drink,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});
drinks.get('/drinks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const drink = await DrinksModel.findById(id);
    if (!drink) {
      return res.status(404).send({
        message: `Drink not found with this id ${id}`,
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      drink,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

drinks.get('/drinks/title/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const drink = await DrinksModel.find({
      title: {
        $regex: title,
        $options: 'i',
      },
    });

    if (!drink) {
      res.status(404).send({
        message: 'Title not found',
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Get by Title successfully',
      drink,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

drinks.post('/drinks/create', async (req, res) => {
  const newDrink = new DrinksModel({
    img: req.body.img,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });

  try {
    const drink = await newDrink.save();

    if (!drink) {
      return re.status(400).send({
        statusCode: 400,
        message: 'Error with POST drink',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'POST successfully',
      drink,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: message.error,
    });
  }
});

drinks.patch('/drinks/update/:id', async (req, res) => {
  const { id } = req.params;

  const drinkExist = await DrinksModel.findById(id);
  if (!drinkExist) {
    return res.status(404).send({
      message: `drink not foun with this id ${id}`,
      statusCode: 404,
    });
  }

  try {
    const updateDrink = req.body;
    const options = { new: true };
    const drink = await DrinksModel.findByIdAndUpdate(id, updateDrink, options);

    res.status(200).send({
      message: 'Update sussessfully',
      statusCode: 200,
      drink,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

drinks.delete('/drinks/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const drink = await DrinksModel.findByIdAndDelete(id);
    if (!drink) {
      return res.status(400).send({
        statusCode: 400,
        message: `drink not found with this id ${id} or already eliminated `,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Delete successfuly',
      drink,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

module.exports = drinks;
