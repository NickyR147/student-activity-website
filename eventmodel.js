const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dateTime: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
