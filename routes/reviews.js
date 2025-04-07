const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviews');

// CRUD Routes
router.get('/new', ReviewController.newReviewForm);
router.get('/:id/edit', ReviewController.editReviewForm);
router.get('/', ReviewController.getAllReviews);
router.post('/', ReviewController.createReview);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;