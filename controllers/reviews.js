const ReviewService = require('../services/reviews');
const { body, validationResult } = require('express-validator');

class ReviewController {
  static async getAllReviews(req, res) {
    try {
      const reviews = await ReviewService.getAllReviews();
      res.render('index', { reviews });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static newReviewForm(req, res) {
    if (!req.user) return res.redirect('/auth/login');
    res.render('new', { errors: [], review: {} });
  }

  static async editReviewForm(req, res) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      if (!review) return res.status(404).send('Review not found');
      if (!req.user || review.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).send('You can only edit your own reviews');
      }
      res.render('edit', { review, errors: [] });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async createReview(req, res) {
    if (!req.user) return res.redirect('/auth/login');
    const validations = [
      body('title').notEmpty().withMessage('Title is required').isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters').trim().escape(),
      body('author').notEmpty().withMessage('Author is required').isLength({ min: 2, max: 50 }).withMessage('Author must be between 2 and 50 characters').trim().escape(),
      body('genre').notEmpty().withMessage('Genre is required').isLength({ min: 2, max: 50 }).withMessage('Genre must be between 2 and 50 characters').trim().escape(),
      body('review').notEmpty().withMessage('Review is required').isLength({ min: 10, max: 500 }).withMessage('Review must be between 10 and 500 characters').trim().escape(),
    ];

    try {
      await Promise.all(validations.map(validation => validation.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('new', { errors: errors.array(), review: req.body });
      }
      const { title, author, genre, review } = req.body;
      await ReviewService.createReview({ title, author, genre, review, userId: req.user._id });
      res.redirect('/reviews');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async updateReview(req, res) {
    const validations = [
      body('title').notEmpty().withMessage('Title is required').isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters').trim().escape(),
      body('author').notEmpty().withMessage('Author is required').isLength({ min: 2, max: 50 }).withMessage('Author must be between 2 and 50 characters').trim().escape(),
      body('genre').notEmpty().withMessage('Genre is required').isLength({ min: 2, max: 50 }).withMessage('Genre must be between 2 and 50 characters').trim().escape(),
      body('reviewText').notEmpty().withMessage('Review is required').isLength({ min: 10, max: 500 }).withMessage('Review must be between 10 and 500 characters').trim().escape(), // Renamed to reviewText
    ];

    try {
      const existingReview = await ReviewService.getReviewById(req.params.id); // Renamed to avoid conflict
      if (!existingReview) return res.status(404).send('Review not found');
      if (!req.user || existingReview.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).send('You can only edit your own reviews');
      }
      await Promise.all(validations.map(validation => validation.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('edit', { errors: errors.array(), review: { ...existingReview.toObject(), ...req.body } });
      }
      const { title, author, genre, reviewText } = req.body; // Renamed to reviewText
      const id = req.params.id;
      const updatedReview = await ReviewService.updateReview(id, { title, author, genre, review: reviewText }); // Pass reviewText as review
      if (!updatedReview) return res.status(404).send('Review not found');
      res.redirect('/reviews');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async deleteReview(req, res) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      if (!review) return res.status(404).send('Review not found');
      if (!req.user || review.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).send('You can only delete your own reviews');
      }
      const success = await ReviewService.deleteReview(req.params.id);
      if (!success) return res.status(404).send('Review not found');
      res.redirect('/reviews');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = ReviewController;