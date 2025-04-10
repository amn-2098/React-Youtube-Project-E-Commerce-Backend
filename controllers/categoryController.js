// controllers/categoryController.js
const Category = require('../models/categoryModel');

// Add Category
const addCategory = async (req, res) => {
    const { title, imageUrl } = req.body;

    try {
        const newCategory = new Category({ title, imageUrl });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error adding category' });
    }
};

// Get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

// Get Single Category by ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category' });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true }
        );
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error updating category' });
    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};

module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
