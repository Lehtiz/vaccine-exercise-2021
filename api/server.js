/* eslint-disable no-console */
const express = require('express');

const app = express();

// Packages
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Middleware for parsing application/json
app.use(express.json());

// Loads .env file contents into process.env
dotenv.config();

// Database connection with Mongoose
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log('Connected to MongoDB');
  },
);

// Define routes
const vaccinesRoute = require('./routes/vaccinations');
const ordersRoute = require('./routes/orders');

// Use routes
app.use('/vaccinations', vaccinesRoute);
app.use('/orders', ordersRoute);

// default anwser on root directory
app.get('/', (req, res) => {
  res.send('Welcome to vaccine api');
});

module.exports = app;
