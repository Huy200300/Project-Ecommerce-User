import React from 'react'
import displayCurrency from '../helpers/displayCurrency'

const PaymentProducts = ({ selectedProducts }) => {
    return (
        <div>
            <div className='mb-5'>
                {
                    selectedProducts?.length > 0 ?
                        <div className=' rounded-lg'>
                            <h2 className="text-xl uppercase font-bold px-6">
                                Sản phẩm trong đơn ({selectedProducts?.length})
                            </h2>
                            <div className='px-6 py-2 bg-white rounded-lg flex flex-col gap-3 shadow-md w-full'>
                                {
                                    selectedProducts.map((product) =>
                                        <div className="">
                                            <div className="flex items-center justify-between border-t pt-4">
                                                <div className="flex items-start gap-2">
                                                    <div className='border-2 rounded-lg p-1.5'>
                                                        <img
                                                            src={product?.selectedColorImage || product?.productImage[0]}
                                                            alt={product?.productName}
                                                            className="w-20 h-20 object-cover"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col space-y-0.5">
                                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                                            {product?.productName}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">Số lượng: <span className="font-medium">{product?.amount}</span></p>

                                                        {product?.selectedColor && (
                                                            <p className="text-sm font-medium text-gray-500">
                                                                Màu: <span className="font-medium text-gray-700">{product?.selectedColor}</span>
                                                            </p>
                                                        )}

                                                        {product?.selectedStorage && (
                                                            <p className="text-sm font-medium text-gray-500">
                                                                Dung lượng: <span className="font-medium text-gray-700">{product?.selectedStorage}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-red-500 text-xl font-bold">
                                                        {displayCurrency(product?.sellingPrice)}
                                                    </p>
                                                    <p className="text-gray-400 line-through">
                                                        {displayCurrency(product?.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {/* <div className="flex items-center mt-4">
                                                    <FaGift className="text-yellow-500 mr-2" />
                                                    <button className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-md font-semibold">
                                                        1 Quà tặng đơn hàng
                                                    </button>
                                                </div> */}
                            </div>

                        </div>
                        :
                        <div className='text-xl font-bold capitalize'>Bạn chưa chọn sản phẩm nào để thanh toán</div>
                }
            </div>
        </div>
    )
}

export default PaymentProducts