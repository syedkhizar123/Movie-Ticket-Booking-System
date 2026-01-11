const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    movie: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: [String],
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Bookings", bookingSchema)

