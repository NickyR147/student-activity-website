const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  zones: [
    {
      zone: {
        type: String,
        enum: ['Zone 1', 'Zone 2', 'Zone 3'],
        required: true
      },
      quantity: {
        type: Number,
        min: 1,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  paymentType: {
    type: String,
    enum: ['Credit Card', 'Bus Card'],
    required: true
  },
  busCardUsed: { // Flag for bus card usage
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
