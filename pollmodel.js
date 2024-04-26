const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
    enum: ['John', 'Mary', 'Susan']
  },
  numberOfVotes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Poll', pollSchema);
