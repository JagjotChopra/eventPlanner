let express=require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const DBConnection = require('./dbConnection');
const path = require('path');
const eventCategoryRoutes = require('./routes/eventCategoryRoutes');
const userDashboardRouter = require('./routes/userDashboardRoutes');
const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const Redis = require('ioredis');
let server=express();

//dbConnecting
DBConnection();
require('dotenv').config();

const redis = new Redis({
    host: '127.0.0.1', // Default Redis host (change if different)
    port: 6379,        // Default Redis port
  });
// Log connection events
redis.on('connect', () => {
    console.log('Connected to Redis');
  });
  
redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

// using middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));  // If you want to handle form data as well
// Serve static files from the 'uploads' directory
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

server.use('/api/v1/user',userRouter);
server.use('/api/v1/admin',adminRouter);
server.use('/api/v1/eventcategories', eventCategoryRoutes);
server.use('/api/v1/user',userDashboardRouter);
server.use('/api/v1/eventvenue', venueRoutes);
server.use('/api/v1/booking', bookingRoutes);
server.use('/api/v1/payments', paymentRoutes);

//server things
const PORT=9000;
server.listen(PORT,()=>{
    console.log("server is started")
})