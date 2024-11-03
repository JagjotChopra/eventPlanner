// models/Category.js
const mongoose = require('mongoose');

const eventcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Path or URL for the image
}, { timestamps: true });

const EventCategory = mongoose.model('EventCategory', eventcategorySchema,"eventcategory");
module.exports = EventCategory;
