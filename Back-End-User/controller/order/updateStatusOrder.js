const orderModel = require("../../model/orderModel");
const StatusChange = require("../../model/StatusUpdate");
const productModel = require("../../model/productModel");

async function updateStatusOrder(req, res) {
  try {
    const { orderId, newStatus, reason } = req.body;

    if (!orderId || !newStatus) {
      return res.status(400).json({
        message: "Thiếu orderId hoặc newStatus",
        error: true,
        success: false,
      });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng với ID đã cho",
        error: true,
        success: false,
      });
    }

    const oldStatus =
      order.statusHistory.length > 0
        ? order.statusHistory[order.statusHistory.length - 1].orderStatus
        : "Chưa có trạng thái";
    if (newStatus === "Delivered") {
      order.isDelivered = true;
      if (order.status === "COD") {
        order.status = "paid";
        order.isPaid = true;
        order.paidAt = Date.now();
        const promises = order.productDetails.map(async (product) => {
          if (product.selectedColor) {
            // $elemMatch là một toán tử trong MongoDB dùng để tìm kiếm các
            // phần tử trong mảng mà thỏa mãn tất cả các điều kiện trong biểu thức của nó.
            await productModel.findOneAndUpdate(
              {
                _id: product.productId,
                colors: {
                  $elemMatch: {
                    colorName: product.selectedColor,
                    stock: { $gte: product.quantity },
                  },
                },
              },
              {
                $inc: {
                  "colors.$[elem].stock": -product.quantity, // Trừ stock theo số lượng mua
                  selled: product.quantity, // Tăng số lượng đã bán
                },
              },
              {
                // arrayFilters cung cấp điều kiện lọc cho các phần tử mảng mà bạn muốn áp dụng cập nhật.
                arrayFilters: [{ "elem.colorName": product.selectedColor }],
                new: true,
              }
            );
          } else {
            // Nếu sản phẩm không có `selectedColor`, cập nhật `countInStock` và `selled`
            await productModel.findOneAndUpdate(
              {
                _id: product.productId,
                countInStock: { $gte: product.quantity }, // Kiểm tra tồn kho của sản phẩm
              },
              {
                $inc: {
                  countInStock: -product.quantity, // Trừ số lượng tồn kho
                  selled: +product.quantity, // Tăng số lượng đã bán
                },
              },
              {
                new: true,
              }
            );
          }
        });
        await Promise.all(promises);
      }
    }

    order.statusHistory.push({
      orderStatus: newStatus,
      updatedAt: Date.now(),
      reason: reason,
      createdBy: req.user._id,
    });

    await order.save();

    const statusChange = new StatusChange({
      orderId: orderId,
      userId: req.user._id,
      oldStatus: oldStatus,
      newStatus: newStatus,
    });

    await statusChange.save();

    const updatedOrder = await orderModel
      .findById(orderId)
      .populate("statusHistory.createdBy", "name");

    res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng và lưu vào lịch sử thành công",
      error: false,
      success: true,
      data: updatedOrder.statusHistory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Đã có lỗi xảy ra",
      error: true,
      success: false,
    });
  }
}

module.exports = updateStatusOrder;
