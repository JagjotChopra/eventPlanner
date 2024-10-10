const User=require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

        
        res.json({ role: user.role,msg:"Login Successful",status:'success' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error',status:'error' });
    }
}   
   module.exports={userSignup};