/** @format */

const express = require('express');
const PizzeModel = require('../Models/pizze');
const pizze = express.Router();

pizze.get('/pizze', async (req, res) => {
  try {
    const pizza = await PizzeModel.find();
    if (!pizza) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Error in Get pizze',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Get successfuly',
      pizza,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});
pizze.get('/pizze/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pizza = await PizzeModel.findById(id);
    if (!pizza) {
      return res.status(404).send({
        message: `Pizza not found with this id ${id}`,
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      pizza,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

pizze.get('/pizze/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const pizza = await PizzeModel.find({
      category: {
        $regex: category,
        $options: 'i',
      },
    });

    if (!pizza) {
      res.status(404).send({
        message: 'Caegory not Found ',
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      pizza,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

pizze.get('/pizze/title/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const pizza = await PizzeModel.find({
      title: {
        $regex: title,
        $options: 'i',
      },
    });

    if (!pizza) {
      res.status(404).send({
        message: 'Title not found',
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Get by Title successfully',
      pizza,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

pizze.post('/pizze/create', async (req, res) => {
  const newPizze = new PizzeModel({
    img: req.body.img,
    price: req.body.price,
    category: req.body.category,
    title: req.body.title,
    ingredients: req.body.ingredients,
    description: req.body.description,
  });

  try {
    const pizze = await newPizze.save();

    if (!pizze) {
      return re.status(400).send({
        statusCode: 400,
        message: 'Error with POST pizze',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'POST successfully',
      pizze,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});

pizze.patch('/pizze/update/:id', async (req, res) => {
  const { id } = req.params;

  const pizzaExist = await PizzeModel.findById(id);
  if (!pizzaExist) {
    return res.status(404).send({
      message: `Pizza not foun with this id ${id}`,
      statusCode: 404,
    });
  }

  try {
    const updatePizza = req.body;
    const options = { new: true };
    const pizza = await PizzeModel.findByIdAndUpdate(id, updatePizza, options);

    res.status(200).send({
      message: 'Update sussessfully',
      statusCode: 200,
      pizza,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

pizze.delete('/pizze/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pizza = await PizzeModel.findByIdAndDelete(id);
    if (!pizza) {
      return res.status(400).send({
        statusCode: 400,
        message: `Pizza not found with this id ${id} or already eliminated `,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Delete successfuly',
      pizza,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

module.exports = pizze;
