const userModel = require("../../model/userModel");
const phoneRegex = /^(03|05|07|08|09|02)\d{8,9}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const {
      userId,
      name,
      email,
      address,
      phone,
      avatar,
      role,
      city,
      fullName,
      addressType,
      defaultAddress,
      detailAddress,
      fullAddress,
    } = req.body;

    if (email && !emailRegex.test(email)) {
      return res.status(400).json({
        message:
          "Định dạng email không hợp lệ.Đã khôi phục về email cũ của bạn ...!",
        success: false,
        error: true,
      });
    }

    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({
        message:
          "Số điện thoại không hợp lệ, Đã khôi phục về số điện thoại cũ của bạn ...!",
        error: true,
        success: false,
      });
    }

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
      ...(address && { address: address }),
      ...(phone && { phone: phone }),
      ...(avatar && { avatar: avatar }),
      ...(city && { city: city }),
      ...(fullName && { fullName: fullName }),
      ...(addressType && { addressType: addressType }),
      ...(defaultAddress && { defaultAddress: defaultAddress }),
      ...(detailAddress && { detailAddress: detailAddress }),
      ...(fullAddress && { fullAddress: fullAddress }),
    };
    const user = await userModel.findById(sessionUser);
    const updateUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    res.json({
      message: "Cập nhật thành công",
      success: true,
      error: false,
      data: updateUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
