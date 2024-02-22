/** @format */

const express = require('express');
const FriedsModel = require('../Models/frieds');
const frieds = express.Router();

frieds.get('/frieds', async (req, res) => {
  try {
    const fried = await FriedsModel.find();
    if (!fried) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Error in Get fried',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Get successfuly',
      fried,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});
frieds.get('/frieds/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const fried = await FriedsModel.findById(id);
    if (!fried) {
      return res.status(404).send({
        message: `Fried not found with this id ${id}`,
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      fried,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

frieds.get('/frieds/title/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const fried = await FriedsModel.find({
      title: {
        $regex: title,
        $options: 'i',
      },
    });

    if (!fried) {
      res.status(404).send({
        message: 'Title not found',
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Get by Title successfully',
      fried,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

frieds.post('/frieds/create', async (req, res) => {
  const newFrieds = new FriedsModel({
    img: req.body.img,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    ingredients: req.body.ingredients,
  });

  try {
    const fried = await newFrieds.save();

    if (!fried) {
      return re.status(400).send({
        statusCode: 400,
        message: 'Error with POST fried',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'POST successfully',
      fried,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});

frieds.patch('/frieds/update/:id', async (req, res) => {
  const { id } = req.params;

  const ingredientExist = await FriedsModel.findById(id);
  if (!ingredientExist) {
    return res.status(404).send({
      message: `fried not foun with this id ${id}`,
      statusCode: 404,
    });
  }

  try {
    const updateFried = req.body;
    const options = { new: true };
    const fried = await FriedsModel.findByIdAndUpdate(id, updateFried, options);

    res.status(200).send({
      message: 'Update sussessfully',
      statusCode: 200,
      fried,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

frieds.delete('/frieds/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const fried = await FriedsModel.findByIdAndDelete(id);
    if (!fried) {
      return res.status(400).send({
        statusCode: 400,
        message: `fried not found with this id ${id} or already eliminated `,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Delete successfuly',
      fried,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

module.exports = frieds;
