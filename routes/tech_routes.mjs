import express, { request } from "express";
import Products from "../models/tech_products.mjs"; 

import data from "../data/tech_products.mjs";
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tech = await Products.find({});
    res.send(tech);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send({ error: 'Failed to fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const searchID = req.params.id
    const findID = await Products.findById(searchID)
    res.send(findID);
  } catch (error) {
    console.error('Error finding users:', error);
    res.status(500).send({ Status: 'Server Error', error });
  }
});

router.post('/stores', async (req, res) => {
  try {
    const count = await Products.countDocuments();

    if (count === 0) {
      const store = [...data, req.body];
      const insertedProducts = await Products.insertMany(store);
      res.status(201).send(insertedProducts);
    } else {
      const { device_type, brand, price, year } = req.body;
      
      const existingProduct = await Products.findOne({ device_type, brand, price, year });
      //data validation here, if product already exists it doesnt allow repeats
      if (existingProduct) {
        return res.status(400).send({ error: 'This product already exists in the database.' });
      }
      const insertedProduct = await Products.create(req.body);
      res.status(201).send(insertedProduct);
    }
  } catch (err) {
    console.error('Error inserting products:', err);
    res.status(500).send({ error: 'Failed to insert products.' });
  }
});
//adding a clear all option as well, for fast removal
router.delete('/clear', async (req, res) => {
  try {
    const clear = await Products.deleteMany({}); // Delete all documents from the Products collection
    console.log('All products cleared:', clear);
    res.status(200).send({ msg: 'All products have been cleared', clear });
  } catch (err) {
    console.error('Error deleting all products:', err);
    res.status(500).send({ error: 'Failed to clear products' });
  }
});
router.delete('/:id', async (req, res) => {
    try {
      const { findID } = req.params;
      const delID = await Products.findByIdAndDelete(findID);
      res.send(delID);
    } catch (err) {
      console.error('Error deleting products, try again!:', err);
      res.status(500).send({ error: 'Failed to fetch products' });
    }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send({ error: 'Failed to update product' });
  }
});

export default router;
//Get Requests are here as well

//POST test is http://localhost:3001/products/store
// when testing the POST (for year remove the comma)

// Clears all data from Database, POST request will always add the preexisting data back 
//http://localhost:3001/products/clear

//PATCH
//http://localhost:3001/products/:id