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
// Serve static files from the 'uploads' directory
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

server.use('/api/v1/user',userRouter);
server.use('/api/v1/admin',adminRouter);

//server things
const PORT=9000;
server.listen(PORT,()=>{
    console.log("server is started")
})