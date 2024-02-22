/** @format */

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 5055;
const cors = require('cors');
require('dotenv').config();
const pizzeRoute = require('./Routes/pizze');
const ingredientRoute = require('./Routes/ingredients');
const friedsRoute = require('./Routes/frieds');
const drinksRoute = require('./Routes/drinks');
const advRoute = require('./Routes/adv');

app.use(cors());
app.use(express.json());

app.use('/', pizzeRoute);
app.use('/', ingredientRoute);
app.use('/', friedsRoute);
app.use('/', drinksRoute);
app.use('/', advRoute);

mongoose.connect(`${process.env.MONGODB_CONNECT}`, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error during connection'));
db.once('open', () => {
  console.log('Database successfully connected');
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT} `));
