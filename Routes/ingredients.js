/** @format */

const express = require('express');
const IngredientsModel = require('../Models/ingredients');
const ingredients = express.Router();

ingredients.get('/ingredients', async (req, res) => {
  try {
    const ingredient = await IngredientsModel.find();
    if (!ingredient) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Error in Get ingredient',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Get successfuly',
      ingredient,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error internal server',
      error: error.message,
    });
  }
});
ingredients.get('/ingredients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await IngredientsModel.findById(id);
    if (!ingredient) {
      return res.status(404).send({
        message: `Ingredient not found with this id ${id}`,
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      ingredient,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

// ingredients.get('/ingredients/category/:category', async (req, res) => {
//   const { category } = req.params;

//   try {
//     const ingredient = await IngredientsModel.find({
//       category: {
//         $regex: category,
//         $options: 'i',
//       },
//     });

//     if (!ingredient) {
//       res.status(404).send({
//         message: 'Caegory not Found ',
//         statusCode: 404,
//       });
//     }

//     res.status(200).send({
//       statusCode: 200,
//       ingredient,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: 'Error internal server',
//       error: error.message,
//       statusCode: 500,
//     });
//   }
// });

ingredients.get('/ingredients/title/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const ingredient = await IngredientsModel.find({
      title: {
        $regex: title,
        $options: 'i',
      },
    });

    if (!ingredient) {
      res.status(404).send({
        message: 'Title not found',
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Get by Title successfully',
      ingredient,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

ingredients.post('/ingredients/create', async (req, res) => {
  const newIngredients = new IngredientsModel({
    img: req.body.img,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const pizze = await newIngredients.save();

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
      error: message.error,
    });
  }
});

ingredients.patch('/ingredients/update/:id', async (req, res) => {
  const { id } = req.params;

  const ingredientExist = await IngredientsModel.findById(id);
  if (!ingredientExist) {
    return res.status(404).send({
      message: `ingredient not foun with this id ${id}`,
      statusCode: 404,
    });
  }

  try {
    const updateIngredients = req.body;
    const options = { new: true };
    const ingredient = await IngredientsModel.findByIdAndUpdate(
      id,
      updateIngredients,
      options
    );

    res.status(200).send({
      message: 'Update sussessfully',
      statusCode: 200,
      ingredient,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

ingredients.delete('/ingredients/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await IngredientsModel.findByIdAndDelete(id);
    if (!ingredient) {
      return res.status(400).send({
        statusCode: 400,
        message: `ingredient not found with this id ${id} or already eliminated `,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Delete successfuly',
      ingredient,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error internal server',
      error: error.message,
      statusCode: 500,
    });
  }
});

module.exports = ingredients;
