require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const pollRoutes = require('./routes/pollRoutes'); // Ensure correct path
const optionRoutes = require('./routes/optionRoutes'); // Ensure correct path
const cors = require('cors');
const connectDB = require('./database'); // Import the DB connection function

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS for frontend access

// Connect to MongoDB
connectDB(); // Ensures independent database connection

// Routes
app.use('/api/v1/polls', pollRoutes); // Poll-related routes
app.use('/api/v1/options', optionRoutes); // Option-related routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
