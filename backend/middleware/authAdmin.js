const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // Import your User model

 const checkAdminRole = async (req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers['authorization']?.split(' ')[1]; // Assuming 'Bearer <token>' format
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, '123456'); // Use your secret key

        // Check if the user exists and has admin role
        const user = await User.findById(decoded.user_id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Attach user to request for use in controllers if needed
        req.user = user;
        next(); // Proceed to the next middleware or controller
    } catch (error) {
      //  console.error(error);
        res.status(500).json({ message: 'Failed to authenticate token.' });
    }
};

module.exports = checkAdminRole;