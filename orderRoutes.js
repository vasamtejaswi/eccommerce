const express = require('express');
const router = express.Router();
const Order = require('../models/orderRoutes');

// Create order
router.post('/', async (req, res) => {
  const { items, total } = req.body;
  const userId = req.user.id;

  const order = new Order({ user: userId, items, total });
  await order.save();

  res.status(201).json(order);
});

// Get user's orders
router.get('/', async (req, res) => {
  const userId = req.user.id;
  const orders = await Order.find({ user: userId }).populate('items.product');
  res.status(200).json(orders);
});

module.exports = router;