let express=require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

const DBConnection = require('./dbConnection');

let server=express();

//dbConnecting
DBConnection();

// using middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));  // If you want to handle form data as well


server.use('/api/v1/user',userRouter);


//server things
const PORT=9000;
server.listen(PORT,()=>{
    console.log("server is started")
})