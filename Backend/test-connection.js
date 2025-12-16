const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  console.log('🔄 Testing MongoDB Atlas Connection...');
  console.log('Connection String:', process.env.MONGO_URL.replace(/:[^:@]*@/, ':****@'));
  
  try {
    // Test with different timeout settings
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌍 Host:', mongoose.connection.host);
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.log('❌ Connection Failed:', error.message);
    console.log('🔍 Error Code:', error.code);
    
    if (error.message.includes('timeout')) {
      console.log('🚨 NETWORK ISSUE: Your IP might not be whitelisted');
      console.log('📋 Steps to fix:');
      console.log('   1. Go to MongoDB Atlas Dashboard');
      console.log('   2. Network Access → Add IP Address');
      console.log('   3. Add 0.0.0.0/0 (Allow from anywhere)');
      console.log('   4. Wait 2-3 minutes for changes to apply');
    }
    
    if (error.message.includes('authentication')) {
      console.log('🔐 CREDENTIALS ISSUE: Check username/password');
    }
  }
}

testConnection();