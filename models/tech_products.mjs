// tech_products.mjs

import mongoose from 'mongoose';

// Schema for Tech Products like Laptops, TVs
const ProductsSchema = new mongoose.Schema({
  device_type: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number, 
    required: true,
    min: 0,
  },
  year: {
    type: Number,
  },
});

const Products = mongoose.model('Products', ProductsSchema);

export default Products;
