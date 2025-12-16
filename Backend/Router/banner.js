const express = require('express');
const Banner = require('../Models/Banner');
const router = express.Router();

// POST /banner/add
router.post('/add', async (req, res) => {
  try {
    const { title, imageURL, linkTo } = req.body;
    const banner = new Banner({ title, imageURL, linkTo });
    await banner.save();
    res.status(201).json({ message: 'Banner added successfully', bannerId: banner._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;