import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/tech_routes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const ATLAS_URI = process.env.ATLAS_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Use the router for '/products' routes
app.use('/products', routes);

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

app.get('/', (req, res) => {
  res.send('Welcome to the Tech Product Store!');
});
