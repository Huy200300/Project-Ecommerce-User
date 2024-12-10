const userModel = require("../../model/userModel");

async function userDetailsMobiles(req, res) {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsMobiles;
