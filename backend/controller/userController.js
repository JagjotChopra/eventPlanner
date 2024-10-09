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

   module.exports={userSignup};