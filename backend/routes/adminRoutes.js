const express = require('express');
const adminRouter = express.Router();
let adminController=require('../controller/adminController');
const checkAdminRole = require('../middleware/authAdmin'); // Adjust the path as necessary
const cacheMiddleware = require('../middleware/cacheMiddleware');

const keyGenerator = (req) => `myEndpoint:${req.originalUrl}`;
const keyGeneratorForCat=(req)=>'eventCategory'
const keyGeneratorForVenue=(req)=>'eventVenue'

adminRouter.use(checkAdminRole);
// Admin Managing Event categories
adminRouter.get('/EventCategory',cacheMiddleware(keyGenerator),adminController.getAllEventCategory)
.post('/EventCategory',cacheMiddleware(keyGeneratorForCat),adminController.upload.single('image'),adminController.addNewEventCategory)
.put('/EventCategory/:id',cacheMiddleware(keyGeneratorForCat), adminController.upload.single('image'), adminController.updateEventCategory)
.delete('/EventCategory/:id',cacheMiddleware(keyGeneratorForCat), adminController.deleteEventCategory);


adminRouter.get('/all-bookings', adminController.getAllBookings);
adminRouter.put('/update-status/:id', adminController.updateBookingStatus);
adminRouter.put('/update-datetime/:id', adminController.updateBookingDateTime);
adminRouter.post('/check-availability', adminController.checkAvailability);



adminRouter.post('/AddEventVenue',cacheMiddleware(keyGeneratorForVenue), adminController.upload.array('images', 10), adminController.addEventVenue);
adminRouter.get('/GetEventVenue',cacheMiddleware(keyGenerator), adminController.getEventVenue);
adminRouter.put('/UpdateVenue/:id',cacheMiddleware(keyGeneratorForVenue),adminController.updateUpload.array('newImages', 10),adminController.updateEventVenue)
adminRouter.delete('/DeleteEventVenue/:id',cacheMiddleware(keyGeneratorForVenue), adminController.deleteEventVenue);

module.exports = adminRouter;