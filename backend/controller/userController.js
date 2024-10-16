const User=require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/sendEmail');

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

   module.exports={userSignup,userLogin, forgotPassword};