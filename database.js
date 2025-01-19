// database.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// MongoDB connection URI
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/pollingApp';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if connection fails
  }
};

// Invoke the connection function automatically
connectDB();

// Export the connection function in case it needs to be reused elsewhere
module.exports = connectDB;
