const productModel = require("../../model/productModel");
const MobileSpecs = require("../../model/mobileSpecs");
const AccessorySpecs = require("../../model/accessorySpecs");
const LaptopSpecs = require("../../model/laptopSpecs");
const TabletSpecs = require("../../model/tabletSpecs");
const WatchesSpecs = require("../../model/watchSpecs");
async function getProductSpecificationsById(req, res) {
  try {
    const { productId } = req.params;
    const product = await productModel
      .findById(productId)
      .populate("specificationsRef")
      .exec();
    return res.json({
      message: "Product successfully",
      success: true,
      error: false,
      data: {
        specificationsRef: product.specificationsRef,
        specificationsModel: product.specificationsModel,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message || error,
      error: error,
      success: false,
    });
  }
}

module.exports = getProductSpecificationsById;
