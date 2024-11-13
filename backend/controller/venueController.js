// controller/venueController.js
const Venue = require('../model/VenueModel');

// Controller to get all venues
exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching venues', error });
  }
};
