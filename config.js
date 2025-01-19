// backend/config.js
require('dotenv').config();

module.exports = {
  API_BASE_URL: "http://localhost:5000/api/v1", // Replace localhost with your backend host if needed
  DB_URI: process.env.DB_URI, // Ensure that your .env file contains DB_URI
};
