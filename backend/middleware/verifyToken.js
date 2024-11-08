const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // Import your User model

const verifyToken = async (req, res, next) => {
    try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    // Verify and decode the token
    const decoded = jwt.verify(token, '123456'); // Use your secret key

    // Check if the user exists and has admin role
    const user = await User.findById(decoded.user_id);
    
    if (!user || user.role !== 'client') {
        return res.status(403).json({ message: 'Access denied. Login required' });
    }

    // Attach user to request for use in controllers if needed
    req.user = user;
    next(); // Proceed to the next middleware or controller
} catch (error) {
    //  console.error(error);
      res.status(500).json({ message: 'Failed to authenticate token.' });
  }
};

module.exports = verifyToken;
