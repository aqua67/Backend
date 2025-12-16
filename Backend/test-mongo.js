const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('URL:', process.env.MONGO_URL);
    
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB Connected!');
    console.log('Database:', conn.connection.name);
    process.exit(0);
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    process.exit(1);
  }
};

testConnection();