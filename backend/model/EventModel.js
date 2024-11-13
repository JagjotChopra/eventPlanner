// models/Event.js
const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventCategory',
        required: true
    },
    venue_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    date: {
        type: Date,
        required: true,
        set: function(val) {
            // Set time to start of day (midnight) in UTC
            if (val) {
                const date = new Date(val);
                date.setUTCHours(0, 0, 0, 0);
                return date;
            }
            return val;
        }
    },
    time_slot: {
        type: [String],
        required: true
    },
    guest_number: {
        type: Number,
        required: true
    },
    sitting_arrangement: {
        type: String,
        required: true
    },
    menu_choice: {
        type: String,
        enum: ['Corporate', 'Social']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Event', eventSchema);