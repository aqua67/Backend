const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const Product = require('./Models/Product');
const User = require('./Models/User');
const Order = require('./Models/Order');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("✅ MongoDB Connected Successfully!!");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Products API
app.get('/api/product', async (req, res) => {
  try {
    const products = await Product.find();
    const formattedProducts = products.map(p => ({
      id: p._id,
      name: p.productName,
      price: p.price,
      category: p.category,
      stock: p.stock,
      img: p.imageURL
    }));
    res.json({ success: true, products: formattedProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Auth API
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Admin login
    if (email === 'admin@astrabeauty.com' && password === 'Admin@123') {
      return res.json({
        success: true,
        user: { name: 'Admin', email, isAdmin: true }
      });
    }
    
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Order API
app.post('/api/order/create', async (req, res) => {
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
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
    console.log("🔗 API Endpoints:");
    console.log("   GET  http://localhost:5000/api/product");
    console.log("   POST http://localhost:5000/api/auth/login");
    console.log("   POST http://localhost:5000/api/auth/register");
    console.log("   POST http://localhost:5000/api/order/create");
});