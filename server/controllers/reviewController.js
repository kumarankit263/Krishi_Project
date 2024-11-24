const Review = require("../models/reviewSchema");
const Product = require("../models/productSchema");

// Add Review
const addReview = async (req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.params;
    const reviewData = { ...req.body, userId, productId };

    // Check for existing review by the user for the same product
    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).send({
        message: "You have already submitted a review for this product.",
      });
    }

    const review = new Review(reviewData);
    await review.save();
    return res.status(201).send({ message: "Review successfully posted" });
  } catch (error) {
    console.error("Error in addReview:", error);

    if (error.code === 11000) {
      // Handle duplicate key error (if unique constraints exist in the schema)
      return res.status(400).send({
        message: "You have already submitted a review for this product.",
      });
    }

    return res.status(500).send({ message: "An internal error occurred!" });
  }
};

// Get Paginated Reviews
const getPaginatedReview = async (req, res) => {
  try {
    const { review_per_page = 10, page = 1 } = req.query; // Defaults to 10 reviews per page
    const { productId } = req.params;

    // Convert query params to integers
    const reviewsPerPage = parseInt(review_per_page, 10);
    const currentPage = parseInt(page, 10);
    const skip = (currentPage - 1) * reviewsPerPage;

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 }) // Use `createdAt` for consistency if available
      .skip(skip)
      .limit(reviewsPerPage)
      .lean();

    const totalReviews = await Review.countDocuments({ productId });

    return res.status(200).send({
      reviews,
      totalReviews,
      currentPage,
      totalPages: Math.ceil(totalReviews / reviewsPerPage),
    });
  } catch (error) {
    console.error("Error in getPaginatedReview:", error);
    return res.status(500).send({ message: "An internal error occurred!" });
  }
};

module.exports = {
  addReview,
  getPaginatedReview,
};
