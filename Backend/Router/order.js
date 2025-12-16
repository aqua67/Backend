const express = require('express');
const Order = require('../Models/Order');
const router = express.Router();

// POST /api/order/create - Store order in MongoDB
router.post('/create', async (req, res) => {
  try {
    const orderData = {
      orderId: `ORD${Date.now()}`,
      ...req.body,
      date: new Date().toISOString().split('T')[0]
    };
    
    const order = new Order(orderData);
    const savedOrder = await order.save();
    
    console.log('✅ Order saved to MongoDB:', savedOrder._id);
    
    res.status(201).json({ 
      success: true,
      message: 'Order placed successfully', 
      orderId: savedOrder.orderId,
      order: savedOrder
    });
  } catch (error) {
    console.error('❌ Order creation failed:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET /api/order/user/:email
router.get('/user/:email', async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.params.email }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
