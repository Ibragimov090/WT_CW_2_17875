const Review = require('../models/review');

class ReviewService {
  // Read all reviews
  static async getAllReviews() {
    try {
      return await Review.find();
    } catch (err) {
      throw new Error('Failed to fetch reviews');
    }
  }

  // Read one review by ID
  static async getReviewById(id) {
    try {
      return await Review.findById(id);
    } catch (err) {
      throw new Error('Review not found');
    }
  }

  // Create a review
  static async createReview({ title, author, genre, review }) {
    try {
      const newReview = new Review({ title, author, genre, review });
      return await newReview.save();
    } catch (err) {
      throw new Error('Failed to create review');
    }
  }

  // Update a review
  static async updateReview(id, updatedData) {
    try {
      return await Review.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (err) {
      throw new Error('Failed to update review');
    }
  }

  // Delete a review
  static async deleteReview(id) {
    try {
      const result = await Review.findByIdAndDelete(id);
      return !!result; // Returns true if deleted, false if not found
    } catch (err) {
      throw new Error('Failed to delete review');
    }
  }
}

module.exports = ReviewService;