const express = require('express');
const adminRouter = express.Router();
let adminController=require('../controller/adminController');
const checkAdminRole = require('../middleware/authAdmin'); // Adjust the path as necessary

adminRouter.use(checkAdminRole);
// Admin Managing Event categories
adminRouter.get('/EventCategory',adminController.getAllEventCategory)
.post('/EventCategory',adminController.upload.single('image'),adminController.addNewEventCategory)
.put('/EventCategory/:id',adminController.upload.single('image'), adminController.updateEventCategory)
.delete('/EventCategory/:id', adminController.deleteEventCategory);

module.exports = adminRouter;