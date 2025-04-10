const mongoose = require('mongoose');

// Define category schema
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
