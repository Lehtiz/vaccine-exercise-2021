const router = require('express').Router();

// Moment.js library for timestamp manipulation
const moment = require('moment');
const Order = require('../models/order');

moment().format();

// Root response
router.get('/', (req, res) => {
  try {
    return res.status(200).json('Orders root');
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get all data
router.get('/all', async (req, res) => {
  try {
    const allOrders = await Order.find();
    return res.status(200).json(allOrders);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get total count
router.get('/count/total', async (req, res) => {
  try {
    const result = await Order.countDocuments();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get count of orders for given date
router.get('/arrived/:date', async (req, res) => {
  // Use UTC to ignore daylight savings time
  const date = moment.utc(req.params.date);
  // Configure full timestamp strings from date for start and end of day
  const dayStart = date.startOf('day').toISOString();
  const dayEnd = date.endOf('day').toISOString();
  try {
    const arrivedCount = await Order.countDocuments({
      arrived: {
        $gte: dayStart,
        $lte: dayEnd,
      },
    });
    return res.status(200).json(arrivedCount);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get count of orders per producer
router.get('/count/orders/:producer', async (req, res) => {
  const { producer } = req.params;
  try {
    const ordersQty = await Order.countDocuments({
      vaccine: producer,
    });
    if (ordersQty === 0) {
      return res.status(500).json(`No results found for ${producer}`);
    }
    return res.status(200).json(ordersQty);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get count of vaccines per producer
router.get('/count/vaccines/:producer', async (req, res) => {
  const { producer } = req.params;
  try {
    const orders = await Order.find({
      vaccine: producer,
    });
    if (orders.length === 0) {
      return res.status(500).json(`No results found for ${producer}`);
    }
    // count number of vaccines in orders
    const vaccinesForProducer = orders.reduce(
      (previousValue, currentValue) => ({
        injections: previousValue.injections + currentValue.injections,
      }),
    );
    return res.status(200).json(vaccinesForProducer.injections);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// total injections arrived
router.get('/count/injections', async (req, res) => {
  try {
    const orders = await Order.find();
    const totalInjections = orders.reduce((previousValue, currentValue) => ({
      injections: previousValue.injections + currentValue.injections,
    }));
    return res.status(200).json(totalInjections.injections);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get producer stats
router.get('/stats/:producer', async (req, res) => {
  const { producer } = req.params;
  try {
    const orders = await Order.find({
      vaccine: producer,
    });

    const vaccinesForProducer = orders.reduce(
      (previousValue, currentValue) => ({
        injections: previousValue.injections + currentValue.injections,
      }),
    );

    const producerStats = {
      ordersQty: orders.length,
      injections: vaccinesForProducer.injections,
    };
    return res.status(200).json(producerStats);
  } catch (error) {
    return res.status(500).json(error);
  }
});
// Get new expirations

// get expirations for date
router.get('/count/expirations/:date', async (req, res) => {
  const startDate = moment.utc(req.params.date).toISOString();
  const expirationDate = moment(startDate).add(1, 'months').toISOString();
  const endDate = moment.utc().toISOString();
  try {
    const allOrders = await Order.find({
      arrived: { $gte: startDate, $lte: endDate },
    });
    console.log('all ', allOrders.length);
    const filtered = allOrders.filter((o) => o.arrived > expirationDate);
    console.log(filtered.length);

    const usedVaccinations = null;

    return res.status(200).json('unfinished');
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
