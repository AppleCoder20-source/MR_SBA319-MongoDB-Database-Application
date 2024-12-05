import express from "express";
import Reviews from '../models/reviews.mjs'
import ReviewData from '../data/reviews.mjs'

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const tech_reviews = await Reviews.find({});
      res.send(tech_reviews);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send({ error: 'Failed to fetch products' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const searchID = req.params.id
      const findID = await Reviews.findById(searchID)
      res.send(findID);
    } catch (error) {
      console.error('Error finding users:', error);
      res.status(500).send({ Status: 'Server Error', error });
    }
  });
router.post('/reviews', async (req, res) => {
    try {
      const count = await Reviews.countDocuments();
  
      if (count === 0) {
        const Ratings = [...ReviewData, req.body];
        const insertReviews = await Reviews.insertMany(Ratings);
        res.status(201).send(insertReviews);
      } else {
        const newReview = await Reviews.create(req.body);
        res.status(201).send(newReview);
      }
    } catch (err) {
      console.error('Error inserting products:', err);
      res.status(500).send({ error: 'Failed to insert products.' });
    }
  });
  export default router;
