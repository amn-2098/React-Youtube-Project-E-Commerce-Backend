const express = require('express');
const { 
    addCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');

const router = express.Router();

router.post('/add', addCategory);             // Add a new category
router.get('/', getCategories);               // Get all categories
router.get('/:id', getCategoryById);          // Get category by ID
router.put('/:id', updateCategory);    // Update category by ID
router.delete('/:id', deleteCategory); // Delete category by ID

module.exports = router;
