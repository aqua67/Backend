const express = require('express');
const User = require('../Models/User');
const Product = require('../Models/Product');
const Order = require('../Models/Order');
const router = express.Router();

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const orders = await Order.find();
    const products = await Product.find();
    const users = await User.find();
    
    const stats = {
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: users.length,
      pendingOrders: orders.filter(order => order.status === 'Processing').length,
      deliveredOrders: orders.filter(order => order.status === 'Delivered').length
    };
    
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status
router.put('/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new admin
router.post('/create-admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    const admin = new User({ name, email, password, role: 'admin' });
    await admin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully', adminId: admin._id });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Generate sample data
router.post('/sample-data', async (req, res) => {
  try {
    // Sample products
    const sampleProducts = [
      { productName: "Matte Lipstick", price: 499, category: "Makeup", imageURL: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80", stock: 50 },
      { productName: "Velvet Foundation", price: 899, category: "Makeup", imageURL: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80", stock: 30 }
    ];
    
    // Sample orders
    const sampleOrders = [
      { orderId: "ORD001", customerName: "John Doe", customerEmail: "john@example.com", date: "2024-01-15", status: "Delivered", total: 1500, items: [{name: "Lipstick", price: 500, quantity: 3}] },
      { orderId: "ORD002", customerName: "Jane Smith", customerEmail: "jane@example.com", date: "2024-01-16", status: "Processing", total: 800, items: [{name: "Foundation", price: 800, quantity: 1}] }
    ];
    
    await Product.insertMany(sampleProducts);
    await Order.insertMany(sampleOrders);
    
    res.json({ success: true, message: 'Sample data created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;