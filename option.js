// models/option.js
const mongoose = require('mongoose');
const Poll = require('./poll'); // Import Poll model for potential use

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const Option = mongoose.model('Option', optionSchema);
module.exports = Option;
