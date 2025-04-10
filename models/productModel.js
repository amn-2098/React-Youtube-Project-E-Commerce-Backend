const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true, // true means visible, false means hidden
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
