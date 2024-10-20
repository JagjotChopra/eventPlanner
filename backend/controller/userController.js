const User=require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/sendEmail');
const tokenBlacklist = new Set();

async function userSignup(req,res){
       const { name, email, password, phone, address } = req.body;
        const role=req.body.role?req.body.role:'client'
       
       try {
           const existingUser = await User.findOne({ email });
           if (existingUser) return res.status(409).json({ msg: 'User already exists',status:"error" });
   
           const hashedPassword = await bcrypt.hash(password, 10);
           
           const newUser= {
               name,
               email,
               password:hashedPassword,
               phone,
               address,
               role
           };
   
           await User.create(newUser);
   
           res.status(201).json({ msg: 'Registration successful',status:"success" });
       } catch (error) {
           res.status(500).json({ msg: 'Server error. Try Later',status:"error" });
       }
   }


   async function userLogin(req,res){
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User Doesn't Exist",status:'error' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials',status:'error' });

        const token = jwt.sign({ user_id: user.user_id, role: user.role }, '123456', { expiresIn: '1h' });
      
        res.json({token,role: user.role,msg:"Login Successful",status:'success' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error',status:'error' });
    }
}   

async function forgotPassword(req, res) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email does not exist',status:'error' });

        const resetToken = jwt.sign({ user_id: user._id, role: user.role }, '123456', { expiresIn: '15m' });
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save(); // Ensure user details (reset token and expiry) are saved
        
        // Log to ensure the token was saved
        console.log("Saved reset token in DB:", user.resetToken);

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        await sendEmail({
            to: user.email,
            subject: 'Password Reset',
            text: `Click on the following link to reset your password: ${resetUrl}`,
        });

        res.json({ message: 'Password reset link sent to your email',status:'success' });
    } catch (error) {
        res.status(500).json({ message: 'Server error',status:'error' });
    }
}


async function resetPassword(req, res) {
    const { password } = req.body;
    const token = req.query.token;

    try {
        // Log token to check if it's being received correctly
        console.log("Token from URL:", token);

        // Check if the token is blacklisted
        if (tokenBlacklist.has(token)) {
            return res.status(400).json({ message: 'Password Already Reset',status:"error" });
        }

        const decoded = jwt.verify(token, '123456'); // Verify the token with the correct secret key
        const user = await User.findById(decoded.user_id);

        // Log user details to ensure correct user is fetched
        console.log("Decoded user_id:", decoded.user_id);
        console.log("User in DB:", user);

        // Token expiration time in milliseconds (decoded.exp is in seconds)
        // const decoded_expiration_time = decoded.exp * 1000;

        // // Add logs for debugging
        // const date = new Date(decoded_expiration_time);
        // const options = { timeZone: 'America/New_York', hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        // const decoded_expired_time_formatted = new Intl.DateTimeFormat('en-US', options).format(date);
        // console.log("User reset token expiration (formatted):", decoded_expired_time_formatted);

        // // Check if the token is expired by comparing decoded_expiration_time with current time
        // if (!user || decoded_expiration_time < Date.now()) {
        //     return res.status(400).json({ message: 'Invalid or expired token' });
        // }

        // Invalidate the token by adding it to the blacklist
        tokenBlacklist.add(token);
        // Update user's password and clear reset token fields
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.json({ message: 'Password reset successful',status:"success" });
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired token',status:"error" });
    }
}

const verifyOldPassword = async (req, res) => {
    const { oldPassword } = req.body; // Old password entered by user
    const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from the Authorization header

    try {
        console.log("Token from URL:", token);

        // Verify the JWT token and extract the payload (including userId)
        const decoded = jwt.verify(token, '123456');
        console.log("Decoded user_id:", decoded.id);

        const userId = decoded.id; // Extract userId from the token
        console.log("UserID in DB:", userId);
        console.log("password Coming from front end:", oldPassword);

        // Find the user in the database by the userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        // Password matched, proceed with further logic like resetting password or other actions
        res.json({ message: 'Old password verified' });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            console.error("Error during password verification:", error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

  module.exports={userLogin, userSignup, forgotPassword, resetPassword, verifyOldPassword};