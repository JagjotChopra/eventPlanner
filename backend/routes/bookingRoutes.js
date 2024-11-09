// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
// const auth = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');
router.use(verifyToken);
router.post('/check-availability', bookingController.checkAvailability);
 router.post('/create-booking', bookingController.createBooking);
// router.get('/user-bookings', auth, bookingController.getUserBookings);
// router.put('/cancel-booking/:id', auth, bookingController.cancelBooking);
module.exports = router;