const express = require('express');
const User = require('../Models/User');
const router = express.Router();

// POST /user/register - HARDCORE MongoDB storage
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = new User({ name, email, password, phone });
    const savedUser = await user.save();
    
    console.log('✅ User saved to MongoDB:', savedUser._id);
    res.status(201).json({ 
      success: true,
      message: 'User registered successfully', 
      userId: savedUser._id,
      user: { name: savedUser.name, email: savedUser.email }
    });
  } catch (error) {
    console.error('❌ User registration failed:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;