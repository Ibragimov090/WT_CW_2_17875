const ReviewService = require('../services/reviews');

class ReviewController {
  static getAllReviews(req, res) {
    const reviews = ReviewService.getAllReviews();
    res.render('index', { reviews });
  }

  static newReviewForm(req, res) {
    res.render('new');
  }

  static editReviewForm(req, res) {
    const review = ReviewService.getReviewById(parseInt(req.params.id));
    if (!review) return res.status(404).send('Review not found');
    res.render('edit', { review });
  }

  static createReview(req, res) {
    const { title, author, genre, review } = req.body;
    if (!title || !author || !genre || !review) {
      return res.status(400).send('All fields are required');
    }
    ReviewService.createReview({ title, author, genre, review });
    res.redirect('/reviews');
  }

  static updateReview(req, res) {
    const { title, author, genre, review } = req.body;
    const id = parseInt(req.params.id);
    if (!title || !author || !genre || !review) {
      return res.status(400).send('All fields are required');
    }
    const updatedReview = ReviewService.updateReview(id, { title, author, genre, review });
    if (!updatedReview) return res.status(404).send('Review not found');
    res.redirect('/reviews');
  }

  static deleteReview(req, res) {
    const success = ReviewService.deleteReview(parseInt(req.params.id));
    if (!success) return res.status(404).send('Review not found');
    res.redirect('/reviews');
  }
}

module.exports = ReviewController;