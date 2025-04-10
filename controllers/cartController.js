// const Cart = require('../models/cartModel'); // Assuming you're using the cart schema
// const Product = require('../models/productModel'); // Assuming you're using the product schema
// const upload = require('../config/multerConfig');  // Multer config for handling image uploads

// // Add Product to Cart (with image upload)
// const addToCart = async (req, res) => {
//     // Handle image upload first using Multer middleware
//     upload.single('image')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'Image upload failed', error: err.message });
//         }

//         const { id, name, price, quantity } = req.body;
//         const image = req.file ? `./uploads/${req.file.filename}` : null; // Get the image path if uploaded

//         // Calculate total price for the product
//         const totalPrice = parseFloat((price * quantity).toFixed(2));

//         // Create a new product object
//         const newProduct = { id, name, price, quantity, totalPrice, image };

//         try {
//             // Check if a cart already exists
//             let cart = await Cart.findOne();

//             if (!cart) {
//                 // If no cart, create a new one
//                 cart = new Cart({
//                     products: [newProduct],
//                     totalQuantity: quantity,
//                     totalPrice: totalPrice,
//                 });
//             } else {
//                 // If cart exists, update it
//                 cart.products.push(newProduct);
//                 cart.totalQuantity += quantity;
//                 cart.totalPrice = parseFloat((cart.totalPrice + totalPrice).toFixed(2)); // Avoid floating-point issues
//             }

//             // Save the updated cart
//             await cart.save();

//             res.status(200).json({
//                 message: 'Product added to cart successfully!',
//                 cart,
//             });
//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ message: 'Error adding product to cart', error: err.message });
//         }
//     });
// };

// // Get Cart Details
// const getCart = async (req, res) => {
//     try {
//         const cart = await Cart.findOne();

//         if (!cart) {
//             return res.status(404).json({ message: 'Cart is empty or not found' });
//         }

//         res.status(200).json({
//             message: 'Cart fetched successfully!',
//             cart,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching cart', error: err.message });
//     }
// };

// // Clear Cart (Remove all products)
// const clearCart = async (req, res) => {
//     try {
//         const cart = await Cart.findOne();

//         if (!cart) {
//             return res.status(404).json({ message: 'Cart is already empty' });
//         }

//         // Remove all products and reset total values
//         cart.products = [];
//         cart.totalQuantity = 0;
//         cart.totalPrice = 0;

//         await cart.save();

//         res.status(200).json({
//             message: 'Cart cleared successfully!',
//             cart,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error clearing cart', error: err.message });
//     }
// };

// module.exports = {
//     addToCart,
//     getCart,
//     clearCart,
// };




const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const upload = require('../config/multerConfig');

// Add Product to Cart (with image upload)
const addToCart = async (req, res) => {
    // Handle image upload first using Multer middleware
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image upload failed', error: err.message });
        }

        // Destructure product details from request body
        const { id, name, price, quantity } = req.body;
        const image = req.file ? `./uploads/${req.file.filename}` : null; // Get the image path if uploaded

        // Calculate total price for the product
        const totalPrice = parseFloat((price * quantity).toFixed(2));

        // Create a new product object
        const newProduct = { id, name, price, quantity, totalPrice, image };

        try {
            // Check if a cart already exists
            let cart = await Cart.findOne();

            if (!cart) {
                // If no cart, create a new one
                cart = new Cart({
                    products: [newProduct],
                    totalQuantity: quantity,
                    totalPrice: totalPrice,
                });
            } else {
                // If cart exists, update it
                cart.products.push(newProduct);
                cart.totalQuantity += quantity;
                cart.totalPrice = parseFloat((cart.totalPrice + totalPrice).toFixed(2)); // Avoid floating-point issues
            }

            // Save the updated cart
            await cart.save();

            res.status(200).json({
                message: 'Product added to cart successfully!',
                cart,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding product to cart', error: err.message });
        }
    });
};

// Get Cart Details
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne();

        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty or not found' });
        }

        res.status(200).json({
            message: 'Cart fetched successfully!',
            cart,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
};

// Clear Cart (Remove all products)
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne();

        if (!cart) {
            return res.status(404).json({ message: 'Cart is already empty' });
        }

        // Remove all products and reset total values
        cart.products = [];
        cart.totalQuantity = 0;
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({
            message: 'Cart cleared successfully!',
            cart,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error clearing cart', error: err.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    clearCart,
};
