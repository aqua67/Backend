const express = require('express');
const User = require('../Models/User');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for admin
    if (email === 'admin@astrabeauty.com' && password === 'Admin@123') {
      return res.json({
        success: true,
        user: { name: 'Admin', email, isAdmin: true }
      });
    }
    
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ 
        success: true, 
        user: {
          name: user.name,
          email: user.email,
          isAdmin: user.role === 'admin'
        }
      });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;