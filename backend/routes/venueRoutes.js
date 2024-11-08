// routes/venueRoutes.js
const express = require('express');
const { getAllVenues } = require('../controller/venueController');
const Venue = require('../model/VenueModel');
const router = express.Router();

// Define the route to get all venues
router.get('/venues', getAllVenues);

router.get('/eventvenues', async (req, res) => {
    try {
        const BASE_URL = 'http://localhost:9000/uploads/';
        const venues = await Venue.find();
        
        venues.forEach(venue => {
            venue.image_upload = venue.image_upload.map(image => BASE_URL + image);
        });

        res.json(venues);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/eventvenues/cities', async (req, res) => {
    try {
        const cities = await Venue.distinct('address.city');
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
