const express = require('express');
const router = express.Router();
const Product = require('../models/ProductRoutes');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Add product
router.post('/', async (req, res) => {
  const { name, price, description, image, category, stock } = req.body;
  try {
    const product = new Product({ name, price, description, image, category, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

module.exports = router;