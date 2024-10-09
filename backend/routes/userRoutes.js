let express=require('express');
let userRouter=express.Router();
let userController=require('../controller/userController');



userRouter.route('/register').post((request,response)=>{
    console.log("Request come for user Registration")
    userController.userSignup(request,response);
})

module.exports=userRouter;