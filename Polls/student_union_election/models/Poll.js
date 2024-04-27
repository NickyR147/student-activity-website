// models/Poll.js

const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  candidate: {
    type: String,
    required: true,
    unique: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Poll', pollSchema);
