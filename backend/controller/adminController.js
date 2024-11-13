const multer = require('multer');
const path = require('path');
const fs = require('fs');
const EventCategory = require('../model/eventCategoryModel');
const Venue = require('../model/VenueModel');
const Booking = require('../model/BookingModel');
const User=require('../model/userModel');
const Event = require('../model/EventModel');
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
    const { name, description } = req.body; // Destructure the name and description from the request body
    const updateFields = { name, description }; // Prepare the update fields

    // Check if there's an uploaded file for the image
    if (req.file) {
        // If an image is uploaded, add it to the update fields
        updateFields.image = req.file.filename; // Assuming the file path is stored in the `path` field
    }

    try {
        // Update the category with the specified fields
        const updatedCategory = await EventCategory.findByIdAndUpdate(
            req.params.id, 
            updateFields, 
            { new: true } // Return the updated document
        );
       const data= {...updatedCategory.toObject(),image:"http://localhost:9000/uploads/"+updatedCategory.image}
        res.status(200).json({status:"success",data}); // Send the updated category as a response
    } catch (error) {
        res.status(500).json({status:"error", message: error.message }); // Handle errors
    }
}



async function deleteEventCategory (req, res) {
    try {
        await EventCategory.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const addEventVenue = async (req, res) => {
    try {
        const { venue_name, size, max_capacity, min_capacity, hall_price, availability_status, address, sitting_arrangement } = req.body;
    
        // Create a new venue object
        const venue = new Venue({
          venue_name,
          size,
          max_capacity,
          min_capacity,
          venue_price: hall_price,
          availability_status,
          address: JSON.parse(address),
          sitting_arrangement: JSON.parse(sitting_arrangement),
          image_upload: req.files.map(file => file.filename), // Store paths of uploaded images
        });
    
        // Save the venue to the database
        await venue.save();
        res.status(201).json({ message: 'Venue added successfully', venue });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
      }
  };
  
  const getEventVenue = async (req, res) => {
    try {
        const venues = await Venue.find(); // Fetching all venues from the database
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }

  const updateUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '-' + file.originalname);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
  });


  const updateEventVenue = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch the venue from the database
      const venue = await Venue.findById(id);
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }
  
      // Destructure existingImages and imagesToRemove from the request body
      const { existingImages = [], imagesToRemove = [] } = req.body;
  
      // Ensure existingImages is always an array
      const existingImagesArray = Array.isArray(existingImages) ? existingImages : [existingImages];
      const removedImagesArray = Array.isArray(imagesToRemove) ? imagesToRemove : [imagesToRemove];
  
      // Log the images to remove and existing images
      console.log("Images to remove:", removedImagesArray);
      console.log("Existing images:", existingImagesArray);
  
      // Handle removing images
      if (removedImagesArray.length > 0) {
        await removeImages(venue, removedImagesArray);
      }
  
      // Extract filenames from the removed images
      const removedFilenamesArray = removedImagesArray.map(image => {
        const parts = image.split('/');
        return parts[parts.length - 1]; // Get the last part, which is the filename
      });
  
      const newImages = req.files.map(file => `${file.filename}`);
      
      // Log newImages to verify its structure
      console.log("New images to add:", newImages);
  
      // Filter out the images that are marked for removal from existing images
      const filteredExistingImages = existingImagesArray.filter(image => 
        !removedFilenamesArray.includes(image)
      );
  
      // Combine the filtered existing images with new images
      venue.image_upload = [...filteredExistingImages, ...newImages];
      
      // Log the combined image_upload array before saving
      console.log("Combined image_upload array:", venue.image_upload);
  
      // Update other venue details if any
      Object.keys(req.body).forEach(key => {
        // if (key !== 'existingImages' && key !== 'imagesToRemove') {
        //   venue[key] = req.body[key];
        // }
        if (key !== 'existingImages' && key !== 'imagesToRemove') {
          // Check if the key is 'sitting_arrangement' and needs to be converted to an array
          if (key === 'sitting_arrangement' && typeof req.body[key] === 'string') {
              // Split the string by commas to convert it into an array
              venue[key] = req.body[key].split(',');
          } else {
              // For other keys, assign the value directly
              venue[key] = req.body[key];
          }
      }
      });
  
     //  console.log("Siiting ",req.body.sitting_arrangement); 
      // Log the venue before saving
      console.log("Venue before saving:", venue);
  
      // Save the updated venue to the database
     await venue.save();
      console.log("Venue updated in DB:", venue);
  
      res.status(201).json({ message: "Venue updated successfully", venue });
    } catch (error) {
      console.error("Error updating venue:", error);
      res.status(500).json({ message: "Error updating venue" });
    }
  };
// Function to remove images from the filesystem
const removeImages = async (venue, images) => {
    if (Array.isArray(images)) {
      for (const image of images) {
        // Construct the path to the image file by removing the base URL part
        const filePath = path.join(__dirname, '../', image.replace('http://localhost:9000', '')); // Adjust path as needed
        // Remove the file from the filesystem if it exists
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Removed: ${filePath}`); // Log for successful removal
        } else {
          console.error(`File not found: ${filePath}`);
        }
      }
      
      // Update the venue's image_upload array by filtering out the removed images
      venue.image_upload = venue.image_upload.filter(img => !images.includes(img));
      
      // Log the updated image_upload array
      console.log("Updated image_upload in DB:", venue.image_upload);
    } else {
      console.error("removeImages: Expected an array but received:", images);
    }
  };


const deleteEventVenue = async(req,res)=>{
    try {
        const venueId = req.params.id;
        const venue = await Venue.findByIdAndDelete(venueId);
        if (!venue) {
            return res.status(404).json({ message: "Venue not found" });
        }
        res.status(200).json({ message: "Venue deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const getAllBookings = async (req, res) => {
  try {
      const bookings = await Booking.find()
          .populate({
              path: 'event_id',
              model: 'Event',
              populate: [
                  { 
                      path: 'category_id',
                      model: 'EventCategory',
                      select: 'name' 
                  },
                  { 
                      path: 'venue_id',
                      model: 'Venue',
                      select: 'venue_name' 
                  }
              ]
          })
          .populate({
              path: 'user_id',
              model: 'user',
              select: 'name email'
          })
          .sort({ booking_date: -1 })
          .lean();

      //console.log('Fetched bookings:', bookings); // For debugging

      res.status(200).json({
          success: true,
          bookings
      });
  } catch (error) {
      console.error('Error in getAllBookings:', error);
      res.status(500).json({
          success: false,
          message: 'Error fetching bookings',
          error: error.message
      });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['booked', 'cancelled'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status value'
        });
    }

    const booking = await Booking.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    ).populate({
        path: 'event_id',
        populate: [
            { 
                path: 'category_id',
                select: 'name' 
            },
            { 
                path: 'venue_id',
                select: 'venue_name' 
            }
        ]
    }).populate('user_id', 'name email');

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found'
        });
    }

    res.status(200).json({
        success: true,
        booking
    });
} catch (error) {
    console.error('Error in updateBookingStatus:', error);
    res.status(500).json({
        success: false,
        message: 'Error updating booking status',
        error: error.message
    });
}
};


const updateBookingDateTime = async (req, res) => {
  try {
      const { id } = req.params;
      const { date, time_slot } = req.body;

      // Validate inputs
      if (!date || !time_slot) {
          return res.status(400).json({
              success: false,
              message: 'Date and time slot are required'
          });
      }

      // First, find the booking and populate event details
      const booking = await Booking.findById(id).populate('event_id');
      
      if (!booking) {
          return res.status(404).json({
              success: false,
              message: 'Booking not found'
          });
      }

      // Convert date string to Date object
      const bookingDate = new Date(date);
      bookingDate.setHours(0, 0, 0, 0);

      try {
          // Update the event using the Event model
          const eventId = booking.event_id._id;
          console.log("EventID:",eventId);
          // First find the event
          const existingEvent = await Event.findOne({ _id: eventId });
          console.log("existingEvent:",existingEvent);
          if (!existingEvent) {
              return res.status(404).json({
                  success: false,
                  message: 'Event not found'
              });
          }

          // Update the event fields
          existingEvent.date = bookingDate;
          existingEvent.time_slot = [time_slot];

          // Save the updated event
          const updatedEvent = await existingEvent.save();

          // Get the updated booking with populated fields
          const updatedBooking = await Booking.findById(id)
            .populate({
                path: 'event_id',
                populate: [
                    { 
                        path: 'category_id',
                        model: 'EventCategory',
                        select: 'name' 
                    },
                    { 
                        path: 'venue_id',
                        model: 'Venue',
                        select: 'venue_name address' 
                    }
                ]
            })
            .populate({
                path: 'user_id',
                model: 'user',
                select: 'name email'
            });

          res.status(200).json({
              success: true,
              booking: updatedBooking,
              message: 'Booking date and time updated successfully'
          });

      } catch (updateError) {
          console.error('Error updating event:', updateError);
          return res.status(500).json({
              success: false,
              message: 'Error updating event',
              error: updateError.message
          });
      }

  } catch (error) {
      console.error('Error in updateBookingDateTime:', error);
      res.status(500).json({
          success: false,
          message: 'Error updating booking date and time',
          error: error.message
      });
  }
};

// Check venue availability
const checkAvailability = async (req, res) => {
  try {
    const { venue_id, date } = req.body;

    if (!venue_id || !date) {
      return res.status(400).json({
        success: false,
        message: 'Venue ID and date are required'
      });
    }

    // Convert date string to a Date object for the start of the day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    // End of the day
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // Get booked events for the specified venue and date (excluding cancelled bookings)
    const bookedEvents = await Event.find({
      venue_id: venue_id,
      date: date,
    });
    console.log("bookedEvents:", bookedEvents);

    // Define all possible time slots
    const timeSlots = ["9-4", "5-11"];

    // Flatten booked events' time slots and find available slots
    const bookedSlots = bookedEvents.flatMap(event => event.time_slot);
    console.log("BookedSlots:", bookedSlots);
    const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
    console.log("availableSlots:", availableSlots);

    // Send response based on availability status
    if (availableSlots.length === 0) {
      return res.json({ message: "The venue is fully booked on this date." });
    } else {
      return res.status(200).json({
        success: true,
        availableSlots,
        message: `Found ${availableSlots.length} available slots`
      });
    }

  } catch (error) {
    console.error('Error in checkAvailability:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking availability',
      error: error.message
    });
  }
};


module.exports={checkAvailability , updateBookingDateTime, getAllBookings, updateBookingStatus,addNewEventCategory,deleteEventCategory,updateEventCategory,getAllEventCategory,upload,addEventVenue,getEventVenue,updateUpload,updateEventVenue,deleteEventVenue};