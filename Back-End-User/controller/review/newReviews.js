const reviewModel = require("../../model/reviewModel");

async function newReviews(req, res) {
  try {
    const { rating, comment, userId } = req.body;
    console.log(userId);
    if (!rating) {
      throw new Error("Hãy đánh giá sản phẩm nhé ");
    }
    if (!comment) {
      throw new Error("Bạn chưa nhập nhận xét");
    }
    if (!userId) {
      return res.json({
        message: "bạn chưa đăng nhập...!",
        success: false,
        error: true,
      });
    }
    const payload = {
      ...req.body,
      userId: userId,
    };
    const review = new reviewModel(payload);
    const saveReview = await review.save();

    res.status(200).json({
      data: saveReview,
      success: true,
      error: false,
      message: "Cảm ơn đánh giá của bạn",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = newReviews;
