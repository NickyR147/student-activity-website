const mongoose = require('mongoose');

const textbookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    unique: true
  },
  available: {
    type: Boolean,
    default: false
  },
  location: {
    type: String
  },
  bookstore: {
    type: String
  }
});

module.exports = mongoose.model('Textbook', textbookSchema);
