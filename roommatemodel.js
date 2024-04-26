const mongoose = require('mongoose')

const roommateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    moveInDate: {
        type: Date,
        required: true
    },
    priceRange: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Roommate', roommateSchema);