const Order = require('../models/orderModel');
const upload = require('../config/multerConfig');
const mongoose = require('mongoose');

// Helper function to upload product images
const uploadProductImages = async (products, req) => {
  return products.map((product, index) => {
      if (req.files && req.files['productImages']) {
          if (req.files['productImages'][index]) {
              product.image = `/uploads/${req.files['productImages'][index].filename}`;
          }
      }
      return product;
  });
};

// Create a new order
const createOrder = async (req, res) => {
  try {
      console.log("Received Order Data:", req.body);
      const { orderNumber, shippingInformation, totalPrice } = req.body;
      let products = req.body.products;

      if (!products || !Array.isArray(products)) {
          return res.status(400).json({ error: "Products field must be an array." });
      }

      const productIds = products.map(id => {
          if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new Error(`Invalid ObjectId: ${id}`);
          }
          return new mongoose.Types.ObjectId(id);
      });

      let parsedShippingInfo;
      try {
          parsedShippingInfo = typeof shippingInformation === 'string'
              ? JSON.parse(shippingInformation)
              : shippingInformation;
      } catch (err) {
          return res.status(400).json({ error: "Invalid shipping information format. Ensure it's valid JSON." });
      }

      const updatedProducts = await uploadProductImages(productIds, req);
      console.log("Updated Products after image upload:", updatedProducts);

      if (!Array.isArray(updatedProducts) || !updatedProducts.every(p => p._id)) {
          return res.status(500).json({ error: "Product image processing failed." });
      }

      const newOrder = new Order({
          orderNumber,
          products: updatedProducts,
          shippingInformation: parsedShippingInfo,
          totalPrice
      });

      const savedOrder = await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully!', order: savedOrder });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating order', details: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
      const order = await Order.findById(req.params.id).populate("products"); 
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        // Validate the status value
        const validStatuses = ['Pending', 'Dispatch', 'Shipped', 'Delivered'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        // Find the order and update the status
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order status by ID
const getOrderStatus = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      res.status(200).json({ status: order.status });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Export all functions
module.exports = {
  createOrder: [upload.fields([{ name: 'productImages', maxCount: 10 }]), createOrder],
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  getOrderStatus
};