const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],  // Store only product IDs
    shippingInformation: { type: Object, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Dispatch', 'Shipped', 'Delivered'], default: 'Pending' },  // Added status field
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
