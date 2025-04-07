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
    res.render('new', { errors: [], review: {} });
  }

  static async editReviewForm(req, res) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      if (!review) return res.status(404).send('Review not found');
      res.render('edit', { review, errors: [] });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async createReview(req, res) {
    // Validation rules with custom length checks
    const validations = [
      body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters')
        .trim().escape(),
      body('author')
        .notEmpty().withMessage('Author is required')
        .isLength({ min: 2, max: 50 }).withMessage('Author must be between 2 and 50 characters')
        .trim().escape(),
      body('genre')
        .notEmpty().withMessage('Genre is required')
        .isLength({ min: 2, max: 50 }).withMessage('Genre must be between 2 and 50 characters')
        .trim().escape(),
      body('review')
        .notEmpty().withMessage('Review is required')
        .isLength({ min: 10, max: 500 }).withMessage('Review must be between 10 and 500 characters')
        .trim().escape(),
    ];

    try {
      // Run validations
      await Promise.all(validations.map(validation => validation.run(req)));
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).render('new', {
          errors: errors.array(),
          review: req.body,
        });
      }

      const { title, author, genre, review } = req.body;
      await ReviewService.createReview({ title, author, genre, review });
      res.redirect('/reviews');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async updateReview(req, res) {
    // Validation rules with custom length checks (same as create)
    const validations = [
      body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters')
        .trim().escape(),
      body('author')
        .notEmpty().withMessage('Author is required')
        .isLength({ min: 2, max: 50 }).withMessage('Author must be between 2 and 50 characters')
        .trim().escape(),
      body('genre')
        .notEmpty().withMessage('Genre is required')
        .isLength({ min: 2, max: 50 }).withMessage('Genre must be between 2 and 50 characters')
        .trim().escape(),
      body('review')
        .notEmpty().withMessage('Review is required')
        .isLength({ min: 10, max: 500 }).withMessage('Review must be between 10 and 500 characters')
        .trim().escape(),
    ];

    try {
      // Run validations
      await Promise.all(validations.map(validation => validation.run(req)));
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const review = await ReviewService.getReviewById(req.params.id);
        return res.status(400).render('edit', {
          errors: errors.array(),
          review: { ...review.toObject(), ...req.body },
        });
      }

      const { title, author, genre, review } = req.body;
      const id = req.params.id;
      const updatedReview = await ReviewService.updateReview(id, { title, author, genre, review });
      if (!updatedReview) return res.status(404).send('Review not found');
      res.redirect('/reviews');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async deleteReview(req, res) {
    try {
      const success = await ReviewService.deleteReview(req.params.id);
      if (!success) return res.status(404).send('Review not found');
      res.redirect('/reviews');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = ReviewController;