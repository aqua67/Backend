const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();

// GET /api/product - Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const formattedProducts = products.map(p => ({
      id: p._id,
      name: p.productName,
      price: p.price,
      category: p.category,
      stock: p.stock,
      img: p.imageURL || p.img || 'https://via.placeholder.com/400x250?text=No+Image'
    }));
    res.json({ success: true, products: formattedProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/product/sample - Add sample products
router.post('/sample', async (req, res) => {
  try {
    const sampleProducts = [
      { productName: "Matte Lipstick", price: 499, category: "Makeup", imageURL: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80", stock: 50 },
      { productName: "Foundation", price: 899, category: "Makeup", imageURL: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80", stock: 30 }
    ];
    
    await Product.insertMany(sampleProducts);
    res.json({ success: true, message: 'Sample products added' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/product/add - Add product
router.post('/add', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    
    console.log('✅ Product saved:', savedProduct._id);
    
    res.status(201).json({ 
      success: true,
      message: 'Product added successfully', 
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;