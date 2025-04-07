const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviews');

router.get('/', ReviewController.getAllReviews);

module.exports = router;