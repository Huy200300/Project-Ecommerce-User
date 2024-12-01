import React from "react";
import moment from "moment";


const InvoiceContent = React.forwardRef(({ dataDetails, displayCurrency },ref) => (
    <div id="invoice-content" className="p-1 bg-white rounded-lg shadow-lg print:shadow-none font-semibold">
        <h2 className="text-2xl font-bold text-center mb-4">HÓA ĐƠN MUA HÀNG</h2>
        
        <div className="mb-6 w-full shadow-xl p-4 rounded-lg print:shadow-none border">
            <h3 className="text-xl text-center font-bold mb-4 capitalize">
                Thông tin đơn hàng
            </h3>
            {dataDetails.map((detail, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <p>
                        <span className="font-bold">Ngày tạo:</span>{" "}
                        {moment(detail.createdAt).format("DD / MM / YYYY")}
                    </p>
                    <p>
                        <span className="font-bold">Mã đơn hàng:</span> #{detail.orderId}
                    </p>
                    <p>
                        <span className="font-bold">Tên người nhận:</span>{" "}
                        {detail.shippingDetails[0].shippingAddress.fullName}
                    </p>
                    <p>
                        <span className="font-bold">Số điện thoại:</span>{" "}
                        {detail.shippingDetails[0].shippingAddress.phone}
                    </p>
                    <p>
                        <span className="font-bold">Địa chỉ:</span>{" "}
                        {detail.shippingDetails[0].shippingAddress.fullAddress}
                    </p>
                </div>
            ))}
        </div>

        <div className="overflow-y-auto max-h-60 print:max-h-none print:overflow-visible mb-6">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-center sticky top-0 z-10">
                        <th className="px-4 py-2">STT</th>
                        <th className="px-4 py-2">Sản phẩm</th>
                        <th className="px-4 py-2">Số lượng</th>
                        <th className="px-4 py-2">Màu sắc</th>
                        <th className="px-4 py-2">Đơn giá (VND)	</th>
                        <th className="px-4 py-2">Thành tiền (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    {dataDetails?.map((detail) => (
                        detail?.productDetails?.map((product, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2 flex items-center space-x-4">
                                    {
                                        product?.color ? <img
                                            src={product?.colorImage}
                                            alt={product?.productName}
                                            className="w-16 h-16 object-cover rounded-md print:hidden"
                                        />
                                            :
                                            <img
                                                src={product?.colorImage[0]}
                                                alt={product?.productName}
                                                className="w-16 h-16 object-cover rounded-md print:hidden"
                                            />
                                    }
                                    <div>
                                        <p className="line-clamp-2 print:inline">{product?.productName}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center">{product?.quantity}</td>
                                <td className='px-4 py-2 text-center'>{product?.color}</td>
                                <td className="px-4 py-2 text-center">{product.sellingPrice.toLocaleString('vi-VN')}</td>
                                <td className="px-4 py- text-center">{(product.sellingPrice * product.quantity).toLocaleString('vi-VN')}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
        <div className="text-right">
            {dataDetails?.map((detail, idx) => (
                <div key={idx}>
                    <p><span className="font-bold text-lg">Phí vận chuyển:</span> {displayCurrency(detail?.shippingDetails?.[0]?.shipping)}</p>
                    <p className="font-semibold"><span className="font-bold text-lg">Tổng cộng:</span> {displayCurrency(detail?.amount)}</p>
                </div>
            ))}
        </div>
    </div>
));

export default InvoiceContent;
