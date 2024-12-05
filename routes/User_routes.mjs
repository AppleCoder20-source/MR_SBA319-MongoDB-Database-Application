import express from "express";
import Users from "../models/Users.mjs";
import dataUsers from "../data/Users.mjs";

const router = express.Router();

//Get all user data now
router.get('/', async (req, res) => {
    try {
      const customers = await Users.find({});
      res.send(customers);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send({ error: 'Failed to fetch Users' });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const searchID = req.params.id
      const findID = await Users.findById(searchID)
      res.send(findID);
    } catch (error) {
      console.error('Error finding users:', error);
      res.status(500).send({ Status: 'Server Error', error });
    }
  });
  router.post('/post', async (req, res) => {
    try {
        const getPost = await Users.create(req.body);
        res.status(201).send({msg: "Success", getPost});
    } catch (err) {
        console.error('Error creating users:', err);
        res.status(500).send({
            error: 'Failed due to repeats, check the JSON data and resubmit!'});
    }
});
export default router;
