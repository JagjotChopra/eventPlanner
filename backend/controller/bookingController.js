// controllers/bookingController.js
const Event = require('../model/EventModel');
const mongoose = require('mongoose');
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

    getBookingDetails: async (req, res) => {
        try {
            const bookingData = await Booking.findOne({ 
                _id: req.params.id,
                user_id: req.user._id 
            }).populate({
                path: 'event_id',
                populate: [
                    { path: 'category_id', model: 'EventCategory', select: 'name' },
                    { path: 'venue_id', model: 'Venue', select: 'venue_name address' }
                ]
            })
            .lean()
            .exec();
    
            if (!bookingData) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found'
                });
            }
    
            // Transform the data to match frontend expectations
            const transformedBooking = {
                _id: bookingData._id,
                user_id: bookingData.user_id,
                event: {
                    category: {
                        name: bookingData.event_id?.category_id?.name || 'N/A'
                    },
                    venue: {
                        venue_name: bookingData.event_id?.venue_id?.venue_name || 'N/A',
                        address: bookingData.event_id?.venue_id?.address || {}
                    },
                    date: bookingData.event_id?.date,
                    time_slot: bookingData.event_id?.time_slot || [],
                    guest_number: bookingData.event_id?.guest_number,
                    sitting_arrangement: bookingData.event_id?.sitting_arrangement,
                    menu_choice: bookingData.event_id?.menu_choice
                },
                venue_cost: bookingData.venue_cost || 0,
                food_cost: bookingData.food_cost || 0,
                total_cost: bookingData.total_cost || '0.00',
                status: bookingData.status || 'pending',
                booking_date: bookingData.booking_date || new Date()
            };
    
            res.status(200).json({
                success: true,
                booking: transformedBooking
            });
        } catch (error) {
            console.error('Error in getBookingDetails:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching booking details',
                error: error.message
            });
        }
    },
    // Modified getUserBookings with debugging
    getUserBookings: async (req, res) => {
        try {
            const bookings = await Booking.find({ 
                user_id: req.user._id 
            })
            .populate({
                path: 'event_id',
                populate: [
                    {
                        path: 'category_id',
                        select: 'name'
                    },
                    {
                        path: 'venue_id',
                        select: 'venue_name address'
                    }
                ]
            })
            .lean()
            .exec();
    
            const transformedBookings = bookings.map(booking => ({
                _id: booking._id,
                user_id: booking.user_id,
                event: {
                    category: {
                        name: booking.event_id?.category_id?.name || 'N/A'
                    },
                    venue: {
                        venue_name: booking.event_id?.venue_id?.venue_name || 'N/A',
                        address: booking.event_id?.venue_id?.address || {}
                    },
                    date: booking.event_id?.date || null,
                    time_slot: booking.event_id?.time_slot || [],
                    guest_number: booking.event_id?.guest_number || 0,
                    sitting_arrangement: booking.event_id?.sitting_arrangement || '',
                    menu_choice: booking.event_id?.menu_choice || null
                },
                venue_cost: booking.venue_cost || 0,
                food_cost: booking.food_cost || 0,
                total_cost: booking.total_cost || '0',
                status: booking.status || 'pending',
                booking_date: booking.booking_date || new Date()
            }));
            
            res.status(200).json({
                success: true,
                bookings: transformedBookings
            });
    
        } catch (error) {
            console.error('Error in getUserBookings:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching bookings',
                error: error.message
            });
        }
    },
    
};
module.exports = bookingController;