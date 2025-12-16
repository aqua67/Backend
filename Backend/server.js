const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./Router/auth');
const adminRoutes = require('./Router/admin');
const productRoutes = require('./Router/product');
const orderRoutes = require('./Router/order');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: false
}));

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

mongoose 
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("✅ MongoDB Connected Successfully!!");
})
.catch((err)=>{
    console.log("❌ MongoDB Connection Failed:",err.message);
    console.log("🔧 CRITICAL: Add your IP to MongoDB Atlas Network Access");
    console.log("📍 MongoDB Atlas → Network Access → Add IP: 0.0.0.0/0");
    process.exit(1);
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
