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
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null; // Image is now coming from req.file

   console.log(name, description, image);
    try {
        const newCategory = new EventCategory({ name, description, image });
        let category=await newCategory.save();
        
        res.status(201).json(
            {
                success: true,
                message: 'Data and image uploaded successfully',
                data:category
              }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllEventCategory (req, res) {
    try {
        const categories = await EventCategory.find();
        data=categories.map((category)=>{
        return {...category.toObject(),image:"http://localhost:9000/uploads/"+category.image}
        })
        console.log(data);
        res.status(200).json(
            {
                success: true,
                data
              }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateEventCategory (req, res) {
   
}



async function deleteEventCategory (req, res) {
    
}

module.exports={addNewEventCategory,deleteEventCategory,updateEventCategory,getAllEventCategory,upload};
