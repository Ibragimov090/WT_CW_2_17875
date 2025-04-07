const Review = require('../models/review');

class ReviewService {
  static async getAllReviews() {
    try {
      return await Review.find().populate('user', 'username');
    } catch (err) {
      throw new Error('Failed to fetch reviews');
    }
  }

  static async getReviewById(id) {
    try {
      return await Review.findById(id).populate('user', 'username');
    } catch (err) {
      throw new Error('Review not found');
    }
  }

  static async createReview({ title, author, genre, review, userId }) {
    try {
      const newReview = new Review({ title, author, genre, review, user: userId });
      return await newReview.save();
    } catch (err) {
      throw new Error('Failed to create review');
    }
  }

  static async updateReview(id, updatedData) {
    try {
      return await Review.findByIdAndUpdate(id, updatedData, { new: true }).populate('user', 'username');
    } catch (err) {
      throw new Error('Failed to update review');
    }
  }

  static async deleteReview(id) {
    try {
      const result = await Review.findByIdAndDelete(id);
      return !!result;
    } catch (err) {
      throw new Error('Failed to delete review');
    }
  }
}

module.exports = ReviewService;