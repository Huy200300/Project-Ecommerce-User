const productModel = require("../../model/productModel");

async function getCategoryWiseProduct(req, res) {
  try {
    const { category, limit = 6, page = 1 } = req?.body || req?.query;
    const product = await productModel
      .find({ category, status: "Completed" })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await productModel.countDocuments({
      category,
      status: "Completed",
    });
    res.json({
      message: "Product",
      error: false,
      success: true,
      data: product,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = getCategoryWiseProduct;
