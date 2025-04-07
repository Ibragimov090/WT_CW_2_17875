const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviews');

// CRUD Routes
router.get('/new', ReviewController.newReviewForm); // Render new review form
router.get('/:id/edit', ReviewController.editReviewForm); // Render edit form
router.get('/', ReviewController.getAllReviews); // List all reviews
router.post('/', ReviewController.createReview); // Create a review
router.put('/:id', ReviewController.updateReview); // Update a review
router.delete('/:id', ReviewController.deleteReview); // Delete a review

module.exports = router;