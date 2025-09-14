const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./connection'); 

// Router imports
const userRouter = require('./routers/userRouter');
const spaceRouter = require('./routers/spaceRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const contactRouter = require('./routers/contactRouter');
const utilRouter = require('./routers/utils');
const bookRouter = require('./routers/bookRouter');
const paymentRouter = require('./routers/paymentRouter'); 

// Initialize app
const app = express();
const port = process.env.PORT || 5500; 

// --- Database Connection ---
connectDB();

// --- Core Middleware ---

// THIS IS THE FIX: Define the allowedOrigins array here
const allowedOrigins = [
  'http://localhost:3000', 
  'https://find-your-space-ten.vercel.app'
];

// Now, use the cors middleware with the defined origins
app.use(cors({
    origin: allowedOrigins
}));

// JSON parser
app.use(express.json());
// Static files
app.use(express.static('./static/uploads'));

// --- API Routes ---
app.use('/user', userRouter);
app.use('/space', spaceRouter);
app.use('/util', utilRouter);
app.use('/feedback', feedbackRouter);
app.use('/booking', bookRouter);
app.use('/contact', contactRouter);
app.use('/payment', paymentRouter);

// Basic route
app.get('/', (req, res) => {
    res.send("Server is running successfully!");
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});