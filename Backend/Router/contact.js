const express = require('express');
const Contact = require('../Models/Contact');
const router = express.Router();

// POST /contact/submit
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully', contactId: contact._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;