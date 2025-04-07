let reviews = []; // Replace with database in a real app

class ReviewService {
  static getAllReviews() {
    return reviews;
  }

  static getReviewById(id) {
    return reviews.find(review => review.id === id);
  }

  static createReview({ title, author, genre, review }) {
    const newReview = {
      id: reviews.length + 1, // Simple ID generation
      title,
      author,
      genre,
      review
    };
    reviews.push(newReview);
    return newReview;
  }

  static updateReview(id, updatedData) {
    const reviewIndex = reviews.findIndex(review => review.id === id);
    if (reviewIndex === -1) return null;
    reviews[reviewIndex] = { ...reviews[reviewIndex], ...updatedData };
    return reviews[reviewIndex];
  }

  static deleteReview(id) {
    const reviewIndex = reviews.findIndex(review => review.id === id);
    if (reviewIndex === -1) return false;
    reviews.splice(reviewIndex, 1);
    return true;
  }
}

module.exports = ReviewService;