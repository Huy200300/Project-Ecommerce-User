import React from 'react'
import displayCurrency from '../helpers/displayCurrency'

const PaymentSummary = ({ selectedProducts, handleChange, isOpen, shippingOrClause, handlePlaceOrder, shippingFee, total, paymentMethod, handlePaymentMethodChange }) => {
    return (
        <div>
            <div className='border p-5 h-fit rounded-md'>
                <h2 className="text-2xl text-center font-bold mb-4 uppercase">Đơn hàng của bạn</h2>
                <div className='flex flex-col gap-3'>
                    <div className="flex items-center justify-between">
                        <div><strong className='uppercase'>Sản phẩm</strong></div>
                        <div><strong className='uppercase'>Giá tiền</strong></div>
                    </div>
                    {
                        selectedProducts?.length > 0 ?
                            selectedProducts?.map((product, index) => (
                                <div key={index} className="flex items-center justify-between font-medium">
                                    <div className='flex gap-1'>{product?.amount}x <span className='line-clamp-2'>{product?.productName}</span></div>
                                    <div>{displayCurrency(product?.sellingPrice)}</div>
                                </div>
                            ))
                            : (<p className='capitalize font-semibold'>chưa có sản phẩm thanh toán nào </p>)
                    }
                    <div className="flex items-center uppercase justify-between">
                        <div className='font-medium'>vận chuyển</div>
                        <div><strong>{displayCurrency(shippingFee) || "FREE"}</strong></div>
                    </div>
                    <div className="flex items-center uppercase justify-between">
                        <div><strong>Tổng cộng</strong></div>
                        <div><strong className="text-2xl text-red-500">{displayCurrency(total)}</strong></div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-bold uppercase">Phương thức thanh toán</h3>
                    <div className="mt-2">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="radio"
                                id="payment-cash"
                                name="paymentMethod"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => handlePaymentMethodChange('cash')}
                                className="form-radio h-5 w-5 accent-red-500"
                            />
                            <label htmlFor="payment-cash" className="font-semibold capitalize">Thanh toán khi nhận hàng</label>
                        </label>
                    </div>
                    <div className="mt-2">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="radio"
                                id="payment-vnpay"
                                name="paymentMethod"
                                value="vnpay"
                                checked={paymentMethod === 'vnpay'}
                                onChange={() => handlePaymentMethodChange('vnpay', "")}
                                className="form-radio h-5 w-5 accent-red-500"
                            />
                            <label htmlFor="payment-vnpay" className="font-semibold capitalize">Thanh toán qua VNPay</label>
                        </label>
                    </div>
                    <div className="mt-2">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="radio"
                                id="payment-momo"
                                name="paymentMethod"
                                value="momo"
                                checked={paymentMethod === 'momo'}
                                onChange={() => handlePaymentMethodChange('momo')}
                                className="form-radio h-5 w-5 accent-red-500"
                            />
                            <label htmlFor="payment-momo" className="font-semibold capitalize">Thanh toán qua MoMo</label>
                        </label>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            value={shippingOrClause.clause}
                            checked={isOpen}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 accent-red-500 border-black"
                        />
                        <span className="capitalize font-bold text-nowrap">Tôi đã đọc và chấp nhận các điều khoản</span>
                    </label>
                </div>

                <button
                    disabled={selectedProducts?.length === 0}
                    onClick={(e) => handlePlaceOrder(e, selectedProducts)}
                    className={`bg-red-500 uppercase rounded-full text-white w-full py-3 mt-6 font-bold hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 ${selectedProducts?.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {paymentMethod === 'momo' || paymentMethod === 'vnpay' ? "thanh toán" : "đặt hàng"}
                </button>
            </div>
        </div>
    )
}

export default PaymentSummary