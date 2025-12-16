const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const Product = require('./Models/Product');

const app = express();
app.use(express.json());
app.use(cors());

// Direct product route test
app.get('/test-products', async (req, res) => {
  try {
    console.log('🔍 Testing product fetch...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connected');
    
    const products = await Product.find();
    console.log(`📦 Found ${products.length} products`);
    
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
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5001, () => {
  console.log('🧪 Test server running on port 5001');
  console.log('📍 Test: http://localhost:5001/test-products');
});