const express = require('express');
const userDashboardController = require('../controller/userDashboardController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.use(verifyToken);
// Route for getting user details - protected by verifyToken middleware
router.get('/profile', userDashboardController.getUserDetails);

// Route for updating user details - protected by verifyToken middleware
router.put('/profile', userDashboardController.updateUserDetails);

module.exports = router;
