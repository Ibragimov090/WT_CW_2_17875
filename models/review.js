const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt/updatedAt fields

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;