// // routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();
// const OrderController = require('../controllers/orderController');

// // Define routes for orders

// // POST route to create a new order (with image upload)
// router.post('/', OrderController.createOrder);  // Handles image upload and order creation

// // GET route to fetch all orders
// router.get('/', OrderController.getOrders);

// // GET route to fetch a single order by ID
// router.get('/:id', OrderController.getOrderById);

// // PUT route to update an existing order
// router.put('/:id', OrderController.updateOrder);

// // DELETE route to delete an order
// router.delete('/:id', OrderController.deleteOrder);

// module.exports = router;


const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// Define routes for orders

// POST route to create a new order (with image upload)
router.post('/', OrderController.createOrder);  // Handles image upload and order creation

// GET route to fetch all orders
router.get('/', OrderController.getOrders);

// GET route to fetch a single order by ID
router.get('/:id', OrderController.getOrderById);

// PUT route to update an existing order
router.put('/:id', OrderController.updateOrder);

// DELETE route to delete an order
router.delete('/:id', OrderController.deleteOrder);

router.put('/:id/status', OrderController.updateOrderStatus);  // Added this route for updating the order status

router.get('/:id/status', OrderController.getOrderStatus); // 👈 Add this line before module.exports


module.exports = router;
