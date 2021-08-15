const router = require('express').Router();

// Moment.js library for timestamp manipulation
const moment = require('moment');
const Order = require('../models/order');
const Vaccination = require('../models/vaccination');

moment().format();

// Root response
router.get('/', (req, res) => {
  try {
    return res.status(200).json('Vaccinations root');
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get all data
router.get('/all', async (req, res) => {
  try {
    const allVaccinations = await Vaccination.find();
    return res.status(200).json(allVaccinations);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get count of vaccinations
router.get('/total', async (req, res) => {
  try {
    const totalVaccinations = await Vaccination.countDocuments();
    return res.status(200).json(totalVaccinations);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get data with vaccinationId
router.get('/id/:id', async (req, res) => {
  const vaccinationId = req.params.id;
  try {
    const result = await Vaccination.findOne({
      'vaccination-id': vaccinationId,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get data for timestamp
router.get('/timestamp/:timestamp', async (req, res) => {
  try {
    const result = await Vaccination.findOne({
      vaccinationDate: req.params.timestamp,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get count of vaccinations
router.get('/count/all', async (req, res) => {
  try {
    const totalVaccinations = await Vaccination.countDocuments();
    return res.status(200).json(totalVaccinations);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get available vaccinations
router.get('/available/:date', async (req, res) => {
  let currentDate = moment.utc().toISOString();
  if (req.params.date.length > 0) {
    currentDate = moment.utc(req.params.date).toISOString();
  }
  const expirationDate = moment(currentDate).add(1, 'months').toISOString();
  try {
    // Fetch all orders and filter from starting date
    const allOrders = await Order.find({
      arrived: { $gte: currentDate, $lte: expirationDate },
    });
    // count all vaccines from allOrders
    if (allOrders.length > 0) {
      const available = allOrders.reduce((previousValue, currentValue) => ({
        injections: previousValue.injections + currentValue.injections,
      }));
      const used = await Vaccination.countDocuments();
      const remaining = available.injections - used;
      return res.status(200).json(remaining);
    }
    return res.status(500).json('No results');
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get expired

module.exports = router;
