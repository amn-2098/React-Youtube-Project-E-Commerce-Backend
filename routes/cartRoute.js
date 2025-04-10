const express = require('express');
const router = express.Router();
const { addToCart, getCart, clearCart } = require('../controllers/cartController');

// Add product to cart
router.post('/add', addToCart);

// Get cart
router.get('/', getCart);

// Clear cart
router.delete('/', clearCart);

module.exports = router;
