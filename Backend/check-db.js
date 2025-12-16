const mongoose = require('mongoose');
const Product = require('./Models/Product');
const User = require('./Models/User');
const Order = require('./Models/Order');
require('dotenv').config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB Atlas');
    
    const products = await Product.find();
    console.log(`📦 Products in database: ${products.length}`);
    if (products.length > 0) {
      console.log('First product structure:', JSON.stringify(products[0], null, 2));
    }
    
    const users = await User.find();
    console.log(`👥 Users in database: ${users.length}`);
    
    const orders = await Order.find();
    console.log(`📋 Orders in database: ${orders.length}`);
    
    mongoose.disconnect();
  } catch (error) {
    console.log('❌ Database check failed:', error.message);
  }
}

checkDatabase();