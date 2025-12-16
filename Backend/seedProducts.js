const mongoose = require('mongoose');
const Product = require('./Models/Product');
require('dotenv').config();

const products = [
  { productName: "Matte Lipstick", price: 499, category: "Women", stock: 50, imageURL: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400" },
  { productName: "Velvet Foundation", price: 899, category: "Women", stock: 30, imageURL: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" },
  { productName: "Waterproof Mascara", price: 699, category: "Women", stock: 45, imageURL: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400" },
  { productName: "Eyeshadow Palette", price: 1299, category: "Women", stock: 25, imageURL: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
  { productName: "Liquid Concealer", price: 599, category: "Women", stock: 35, imageURL: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400" },
  { productName: "Glossy Lip Gloss", price: 399, category: "Women", stock: 40, imageURL: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400" },
  { productName: "Blush Powder", price: 549, category: "Women", stock: 30, imageURL: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400" },
  { productName: "Hydrating Serum", price: 999, category: "Women", stock: 20, imageURL: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
  { productName: "Men's Cologne", price: 1499, category: "Men", stock: 25, imageURL: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400" },
  { productName: "Beard Oil", price: 799, category: "Men", stock: 35, imageURL: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400" },
  { productName: "Men's Face Wash", price: 549, category: "Men", stock: 40, imageURL: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
  { productName: "Hair Styling Gel", price: 649, category: "Men", stock: 30, imageURL: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400" },
  { productName: "Aftershave Lotion", price: 899, category: "Men", stock: 25, imageURL: "https://images.unsplash.com/photo-1564024392149-daac0e0c1d1f?w=400" },
  { productName: "Men's Moisturizer", price: 749, category: "Men", stock: 35, imageURL: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400" }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    
    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Added ${insertedProducts.length} products to database`);
    
    console.log('📊 Products added:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.productName} (${product.category}) - ₹${product.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();