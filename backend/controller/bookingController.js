// controllers/bookingController.js
const Event = require('../model/EventModel');
 const Booking = require('../model/BookingModel');
const Venue = require('../model/VenueModel');
const Category = require('../model/eventCategoryModel');
const bookingController = {
    // Check venue availability
    checkAvailability: async (req, res) => {
        try {
            const { venue_id, date } = req.body;
    
            // Convert date string to a Date object
            const bookingDate = new Date(date);
    
            // Get booked events for the specified venue and date (excluding cancelled bookings)
            const bookedEvents = await Event.find({
                venue_id: venue_id,
                date: bookingDate,
            });
    
            // Define available time slots
            const timeSlots = ["9-4", "5-11"];
            
          // Flatten booked events' time slots and find available slots
const bookedSlots = bookedEvents.flatMap(event => event.time_slot);
const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
            console.log(availableSlots);
            // Check the availability status based on booked slots
            if (availableSlots.length === 0) {
                res.json({ message: "The venue is fully booked on this date." });
            } else {
                res.json({ availableSlots });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    
   
    // Create new booking
    createBooking: async (req, res) => {
         console.log(req.body);
        //  console.log(req.user._id)
        try {
            const {
                categoryId,
                venueId,
                date,
                timeSlot,
                guestNumber,
                sittingArrangement,
                includeFoodService,
                menuChoice,
                venueCost,
                foodCost,
                totalCost
            } = req.body;
        const userId=req.user._id;
        const user_name = req.user.name;
        const email_id = req.user.email;
            // Create event first
            const event = new Event({
                category_id: categoryId,
                venue_id: venueId,
                date: date,
                time_slot:timeSlot,
                guest_number: guestNumber,
                sitting_arrangement: sittingArrangement,
                menu_choice: includeFoodService ? menuChoice : null
            });
            let ev=   await event.save();
         
            // Create booking
            const booking = new Booking({
                user_id: req.user._id,
                event_id: ev._id,
                venue_cost:venueCost,
                food_cost:foodCost,
                total_cost: totalCost
            });
          let book=  await booking.save();
          const venue = await Venue.findOne({ _id: venueId });
          const eventCategory = await Category.findOne({ _id: categoryId });
            res.status(201).json({
                message: 'Booking created successfully',
                booking:book,
                event:ev,
                name: user_name,
                email: email_id,
                venue: venue,
                category: eventCategory,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    
};
module.exports = bookingController;