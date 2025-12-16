const express = require('express');
const User = require('../Models/User');
const Order = require('../Models/Order');
const Product = require('../Models/Product');
const Contact = require('../Models/Contact');
const router = express.Router();

// GET /api/users - Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders - Fetch all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/stats - Fetch dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({});
    
    // Calculate total revenue
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    
    // Calculate order status counts
    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });
    
    res.json({ 
      success: true, 
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products - Fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/contacts - Fetch all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ submittedAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
