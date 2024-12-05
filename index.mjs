import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/tech_routes.mjs';
import router1 from './routes/User_routes.mjs';
import router2 from './routes/review_routes.mjs';
import Users from './models/Users.mjs';
import DataUsers from './data/Users.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const ATLAS_URI = process.env.ATLAS_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Use the router for '/products' routes
app.use('/products', routes);
app.use('/users', router1);
app.use('/rev', router2);

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
  app.get('/early', async (req, res) => {
    try {
      // Delete documents to avoid redundancy
      await Users.deleteMany({});
  
      const info = await Users.insertMany([...DataUsers]);
      res.send(info);
    } catch (error) {
      console.error('Error inserting users:', error);
      res.status(500).send({ message: 'Server Error', error });
    }
  });
  //This retrieves all of our early users
  //link: http://localhost:3001/early
  

app.get('/', (req, res) => {
  res.send('Welcome to the Tech Product Store!');
});
