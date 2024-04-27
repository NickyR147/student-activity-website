// routes/pollRoutes.js

const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// Get poll results
router.get('/', async (req, res) => {
  try {
    const pollResults = await Poll.find();
    res.json(pollResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vote in the poll
router.post('/vote', async (req, res) => {
  const { candidate } = req.body;

  try {
    const poll = await Poll.findOneAndUpdate(
      { candidate },
      { $inc: { votes: 1 } },
      { new: true, upsert: true }
    );
    res.json(poll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
