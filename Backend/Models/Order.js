const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String
  },
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  pincode: {
    type: String
  },
  orderItems: [{
    productId: String,
    productName: String,
    quantity: Number,
    price: Number,
    imageURL: String
  }],
  paymentMode: {
    type: String,
    default: 'COD'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    default: 'Pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);