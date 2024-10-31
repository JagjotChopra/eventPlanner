const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  venue_name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalcode: { type: String, required: true },
    country: { type: String, required: true },
  },
  size: { type: String, required: true },
  sitting_arrangement: { type: [String], required: true }, // Array of strings for multiple options
  max_capacity: { type: Number, required: true },
  min_capacity: { type: Number, required: true },
  venue_price: { type: Number, required: true }, // Renamed from hall_price
  availability_status: { type: String, required: true },
  image_upload: { type: [String], required: true }, // Store multiple image paths
});

module.exports = mongoose.model('Venue', venueSchema);
