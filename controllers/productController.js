const Product = require('../models/productModel'); // Assuming you are using the productSchema

// Add Product with Image
const addProduct = async (req, res) => {
    const { name, price, categories } = req.body;
    const imageUrl = req.file ? `./uploads/${req.file.filename}` : null;

    // Parse categories if it's a string (handle case where categories are sent as stringified array)
    const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Image upload failed' });
    }

    try {
        const newProduct = new Product({
            name,
            price,
            categories: parsedCategories, // Ensure categories is an array
            image: imageUrl,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error adding product', details: error.message });
    }
};

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
};


// Get Product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product', details: error.message });
    }
};


// Update Product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, categories } = req.body;
    const image = req.file ? `./uploads/${req.file.filename}` : req.body.image;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, categories, image },
            { new: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product', details: error.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product', details: error.message });
    }
};

// Toggle isActive or isDeleted
// Toggle Product isActive
const toggleActiveStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
  
      product.isActive = !product.isActive;
      await product.save();
  
      res.status(200).json({ message: 'isActive toggled', product });
    } catch (error) {
      res.status(500).json({ error: 'Error toggling status', details: error.message });
    }
  };
  

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    toggleActiveStatus,
    getProductById
};
