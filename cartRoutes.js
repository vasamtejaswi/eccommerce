const express = require('express');
const router = express.Router();
const Cart = require('../models/cartRoutes');

// Get user's cart
router.get('/', async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  res.json(cart);
});

// Add to cart
router.post('/', async (req, res) => {
  const { product, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === product);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
});

// Remove from cart
router.delete('/:productId', async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  await cart.save();

  res.status(200).json(cart);
});

module.exports = router;