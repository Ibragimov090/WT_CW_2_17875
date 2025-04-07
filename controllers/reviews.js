const ReviewService = require('../services/reviews');

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
    res.render('new');
  }

  static async editReviewForm(req, res) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      if (!review) return res.status(404).send('Review not found');
      res.render('edit', { review });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async createReview(req, res) {
    try {
      const { title, author, genre, review } = req.body;
      if (!title || !author || !genre || !review) {
        return res.status(400).send('All fields are required');
      }
      await ReviewService.createReview({ title, author, genre, review });
      res.redirect('/reviews');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async updateReview(req, res) {
    try {
      const { title, author, genre, review } = req.body;
      const id = req.params.id;
      if (!title || !author || !genre || !review) {
        return res.status(400).send('All fields are required');
      }
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