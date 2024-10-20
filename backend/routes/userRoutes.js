let express=require('express');
let userRouter=express.Router();
let userController=require('../controller/userController');


userRouter.route('/register').post((request,response)=>{
    console.log("Request come for user Registration")
    userController.userSignup(request,response);
})

userRouter.route('/login').post((request,response)=>{
    console.log("Request come user login")
    userController.userLogin(request,response);

})

userRouter.route('/forgotpassword').post((request,response)=>{
    console.log("Request come for forgot password ")
    userController.forgotPassword(request,response);

})

userRouter.route('/reset-password').post((request,response)=>{
    console.log("Request come for reset password ")
    userController.resetPassword(request,response);
})

userRouter.route('/verify-password').post((request,response)=>{
    console.log("Request come for Verify password ")
    userController.verifyOldPassword(request,response);
})

userRouter.route('/update-password').post((request,response)=>{
    console.log("Request come for Update password ")
    userController.updatePassword(request,response);
})

module.exports=userRouter;