const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Import the existing productSchema
const Product = require('./productModel');  // Adjust the path based on your file structure

// Define the cart schema
const cartSchema = new Schema({
  products: {
    type: [Product.schema],  // Use the schema of the Product model, not the model itself
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  }
});

// Create the model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
