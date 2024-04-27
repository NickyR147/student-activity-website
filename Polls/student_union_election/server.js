// server.js

const express = require('express');
const mongoose = require('mongoose');
const pollRoutes = require('./routes/pollRoutes');

const app = express();
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 5555;

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://Joseph:Nicky123@cluster11266.s4ee0za.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Define Mongoose schema
const voteSchema = new mongoose.Schema({
  candidate: String,
});

const Vote = mongoose.model('Vote', voteSchema);

// Routes
app.post('/vote', async (req, res) => {
  try {
    const { candidate } = req.body;
    const newVote = new Vote({ candidate });
    await newVote.save();
    res.status(201).json({ message: 'Vote recorded successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/results', async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      { $group: { _id: '$candidate', count: { $sum: 1 } } },
    ]);
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
