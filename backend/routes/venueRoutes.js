// routes/venueRoutes.js
const express = require('express');
const { getAllVenues } = require('../controller/venueController');

const router = express.Router();

// Define the route to get all venues
router.get('/venues', getAllVenues);

module.exports = router;
