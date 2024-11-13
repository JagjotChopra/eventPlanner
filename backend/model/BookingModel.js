// models/Booking.js
const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    booking_date: {
        type: Date,
        default: Date.now
    },
    venue_cost: {
        type: Number,
        required: true
    },
    food_cost: {
        type: Number,
        required: true
    },
    total_cost: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    }
});
module.exports =  mongoose.model('Booking', bookingSchema);