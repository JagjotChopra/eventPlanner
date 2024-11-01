// routes/eventCategoryRoutes.js
const express = require('express');
const router = express.Router();
const EventCategory = require('../model/eventCategoryModel');

// GET all event categories
router.get('/', async (req, res) => {
    try {
        const categories = await EventCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories' });
    }
});

module.exports = router;
