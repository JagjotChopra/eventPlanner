const multer = require('multer');
const path = require('path');
const EventCategory = require('../model/eventCategoryModel');

// Multer storage configuration for saving files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Path to save uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with a timestamp to avoid duplicates
    }
});

const upload = multer({ storage: storage });


async function addNewEventCategory(req, res) {
    
}

async function getAllEventCategory (req, res) {
   
}

async function updateEventCategory (req, res) {
   
}



async function deleteEventCategory (req, res) {
    
}

module.exports={addNewEventCategory,deleteEventCategory,updateEventCategory,getAllEventCategory,upload};
