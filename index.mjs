import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Products from './models/tech_products.mjs';
import data from './data/posts.mjs'; 

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3001;
const ATLAS_URI = process.env.ATLAS_URI;

// Middleware
app.use(cors());
app.use(express.json()); 


mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connection established:', ATLAS_URI);

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Tech Product Store!');
});

app.get('/products', async (req,res) => {
  const tech = await Products.find();
  res.send(tech)
});

app.post('/store', async (req, res) => {
  try {
    const count = await Products.countDocuments();

    if (count === 0) {
      const combinedData = [...data, req.body];
      const insertedProducts = await Products.insertMany(combinedData);
      res.status(201).send(insertedProducts);
    } else {
      // Check if the exact product already exists
      const {device_type, brand, price, year } = req.body;
      const existingProduct = await Products.findOne({ device_type, brand, price, year });

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
