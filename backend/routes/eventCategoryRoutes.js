// routes/eventCategoryRoutes.js
const express = require('express');
const router = express.Router();
const EventCategory = require('../model/eventCategoryModel');

const cacheMiddleware = require('../middleware/cacheMiddleware');
// Define a unique key based on the request URL
const keyGenerator = (req) => `myEndpoint:${req.originalUrl}`;


// GET all event categories
router.get('/',cacheMiddleware(keyGenerator),  async (req, res) => {
    try {
        const categories = await EventCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories' });
    }
});



module.exports = router;
