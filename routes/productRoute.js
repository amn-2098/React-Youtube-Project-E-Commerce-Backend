const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');  // Assuming your Multer config is in 'config/multerConfig'
const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    toggleActiveStatus,
    getProductById
} = require('../controllers/productController.js');

// Add a new product (with image upload)
router.post('/add', upload.single('imageUrl'), addProduct);

// Get all products
router.get('/', getProducts);

router.get('/:id', getProductById);

// Update a product by ID (with image upload support)
router.put('/update/:id', upload.single('imageUrl'), updateProduct);

// Delete a product by ID
router.delete('/delete/:id', deleteProduct);
router.patch('/toggle/:id', toggleActiveStatus);


module.exports = router;
