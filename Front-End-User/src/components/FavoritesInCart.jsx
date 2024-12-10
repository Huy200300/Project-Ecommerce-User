import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import displayCurrency from '../helpers/displayCurrency';
import { FaHeart, FaStar } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FavoritesInCart = ({ selectedColor, setSelectedColor }) => {
    const { favorites, removeFavorite, favoritesLength } = useFavorites();
    const [visibleProducts, setVisibleProducts] = useState(4);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleShowMore = () => {
        setVisibleProducts((prevCount) => prevCount + 4);
    };

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        // <div className='mt-5 p-4'>
        //     {
        //         favoritesLength > 0 && (
        //             <div className="p-4 border-2 rounded-lg">
        //                 <h1 className="text-2xl border-b-2 pb-2 border-black font-bold mb-4 flex items-center justify-between">
        //                     <div className='flex items-center '>
        //                         <FaHeart size={28} className="mr-2" />
        //                         Sản Phẩm Yêu Thích
        //                     </div>
        //                     <button onClick={handleToggleCollapse} className="flex items-center">
        //                         {isCollapsed ? <FiChevronDown size={28} /> : <FiChevronUp size={28} />}
        //                     </button>
        //                 </h1>
        //                 {!isCollapsed &&
        //                     <>
        //                         <div className="grid grid-cols-4 gap-4">
        //                             {favorites?.slice(0, visibleProducts)?.map((product) => (
        //                                 <div key={product?.id} className="cursor-pointer p-4 flex flex-col items-center border rounded-lg relative">
        //                                     <button
        //                                         onClick={() => removeFavorite(product?._id)}
        //                                         className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        //                                     >
        //                                         <AiOutlineClose size={20} />
        //                                     </button>

        //                                     <img
        //                                         src={product?.productImage[0]}
        //                                         alt={product?.productName}
        //                                         className="w-full h-40 object-contain mb-4"
        //                                     />

        //                                     <a href={`/product/${product?._id}`} className="text-blue-600 font-semibold line-clamp-2 hover:underline">
        //                                         {product?.productName}
        //                                     </a>

        //                                     <div className="flex items-center mt-2">
        //                                         <span className="text-yellow-500 flex">
        //                                             {
        //                                                 product?.averageRating > 0 && (
        //                                                     <>
        //                                                         {[...Array(5)].map((_, index) => (
        //                                                             <FaStar key={index} className={`text-lg ${index < product?.averageRating?.toFixed(1) ? 'text-yellow-500' : 'text-gray-300'} mr-1`} />
        //                                                         ))}
        //                                                     </>
        //                                                 )
        //                                             }
        //                                         </span>
        //                                         {product?.reviewCount > 0 && <span className="ml-2 text-sm text-gray-600">({product?.reviewCount})</span>}
        //                                     </div>

        //                                     <div className="flex items-center flex-col mt-2">
        //                                         <div className="text-2xl font-bold">{displayCurrency(product?.sellingPrice)}</div>
        //                                         <div className="text-gray-500 line-through">{displayCurrency(product?.price)}</div>
        //                                     </div>

        //                                     <button
        //                                         className={`flex font-semibold items-center justify-center text-nowrap w-full uppercase p-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-300 ${product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        //                                         onClick={(e) => handleAddToCart(e, product)}
        //                                         disabled={product?.countInStock === 0}
        //                                     >
        //                                         {product?.countInStock === 0 ? 'Hết hàng' : 'Thêm vào Giỏ hàng'}
        //                                     </button>
        //                                 </div>
        //                             ))}
        //                         </div>
        //                         {visibleProducts < favoritesLength && (
        //                             <div className="flex justify-center mt-4">
        //                                 <button
        //                                     onClick={handleShowMore}
        //                                     className="text-blue-600 hover:underline font-semibold"
        //                                 >
        //                                     Xem thêm
        //                                 </button>
        //                             </div>
        //                         )}
        //                     </>
        //                 }
        //             </div>
        //         )
        //     }
        // </div>
        <div className="mt-5 p-3">
            {favoritesLength > 0 && (
                <div className="p-3 border rounded-lg">
                    <h1 className="text-xl border-b pb-2 border-black font-bold mb-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <FaHeart size={24} className="mr-2" />
                            Sản Phẩm Yêu Thích
                        </div>
                        <button onClick={handleToggleCollapse} className="flex items-center">
                            {isCollapsed ? <FiChevronDown size={24} /> : <FiChevronUp size={24} />}
                        </button>
                    </h1>
                    {!isCollapsed && (
                        <>
                            <div className="grid grid-cols-4 gap-4">
                                {favorites?.slice(0, visibleProducts)?.map((product) => (
                                    <div
                                        key={product?._id}
                                        className="cursor-pointer p-3 flex flex-col items-center border rounded-lg relative"
                                    >
                                        {/* Nút xóa sản phẩm */}
                                        <button
                                            onClick={() => removeFavorite(product?._id)}
                                            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                                        >
                                            <AiOutlineClose size={18} />
                                        </button>

                                        {/* Ảnh sản phẩm */}
                                        <img
                                            src={product?.productImage?.[0]}
                                            alt={product?.productName}
                                            className="w-full h-32 object-contain mb-2"
                                        />

                                        {/* Tên sản phẩm */}
                                        <a
                                            href={`/product/${product?._id}`}
                                            className="text-blue-600 text-sm text-center font-semibold line-clamp-1 hover:underline"
                                        >
                                            {product?.productName}
                                        </a>

                                        {/* Đánh giá */}
                                        <div className="flex items-center mt-1">
                                            <span className="text-yellow-500 flex">
                                                {/* {console.log(product)} */}
                                                {[...Array(5)].map((_, index) => (
                                                    <FaStar
                                                        key={index}
                                                        className={`text-sm ${index < Math.round(product?.averageRating || 0)
                                                                ? 'text-yellow-500'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </span>
                                            {product?.reviewCount > 0 && (
                                                <span className="ml-1 text-xs text-gray-600">
                                                    ({product?.reviewCount})
                                                </span>
                                            )}
                                        </div>

                                        {/* Giá */}
                                        <div className="flex items-center flex-col mt-1">
                                            <div className="text-lg font-bold">
                                                {displayCurrency(product?.sellingPrice)}
                                            </div>
                                            {product?.price && (
                                                <div className="text-gray-500 line-through text-sm">
                                                    {displayCurrency(product?.price)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Nút thêm vào giỏ hàng */}
                                        <button
                                            className={`flex font-semibold items-center justify-center text-xs w-full uppercase p-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-300 ${product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            disabled={product?.countInStock === 0}
                                        >
                                            {product?.countInStock === 0 ? 'Hết hàng' : 'Thêm vào Giỏ hàng'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {visibleProducts < favoritesLength && (
                                <div className="flex justify-center mt-3">
                                    <button
                                        onClick={handleShowMore}
                                        className="text-blue-600 text-sm hover:underline font-semibold"
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default FavoritesInCart;
