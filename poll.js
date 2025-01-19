// models/poll.js
const mongoose = require('mongoose');
const Option = require('./option'); // Import Option model for reference

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option', // Reference to the Option model
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
