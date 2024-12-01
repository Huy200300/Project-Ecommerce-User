import { Link } from "react-router-dom";
import calculateDiscount from "../helpers/calculateDiscount";
import displayCurrency from "../helpers/displayCurrency";
import translatedCategory from "../helpers/translatedCategory";
import { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import scrollTop from "../helpers/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading, excludeProductId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(7).fill(null);

    const fetchData = async (category) => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    };

    useEffect(() => {
        if (category) {
            fetchData(category);
        }
    }, [category]);

    return (
        <div className="container mx-auto px-4 my-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">{heading}</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
                            <div className="bg-gray-200 h-48"></div>
                            <div className="p-4">
                                <div className="bg-gray-300 h-6 mb-2"></div>
                                <div className="bg-gray-300 h-4 mb-4"></div>
                                <div className="flex space-x-2">
                                    <div className="bg-gray-300 w-1/2 h-8"></div>
                                    <div className="bg-gray-300 w-1/2 h-8"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    data
                        .filter(product => product._id !== excludeProductId)
                        .map((product) => (
                            <Link
                                to={`/product/${product?._id}`}
                                key={product?._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                <div className="relative">
                                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                                        <img src={product?.productImage[0]} alt={product?.category} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                                    </div>
                                    <div className="absolute top-2 right-2 bg-white text-red-600 font-bold text-xs px-2 py-1 rounded-full">
                                        {calculateDiscount(product?.price, product?.sellingPrice)}% OFF
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-medium text-gray-800 truncate">{product?.productName}</h3>
                                    <div className="text-gray-500 text-sm mt-1">{translatedCategory(product?.category)}</div>
                                    <div className="flex items-center mt-2">
                                        <p className="text-red-600 text-lg font-semibold">{displayCurrency(product?.sellingPrice)}</p>
                                        <p className="text-gray-500 line-through ml-2">{displayCurrency(product?.price)}</p>
                                    </div>
                                    {/* <button
                                        className="mt-3 w-full py-2 bg-red-600 text-white font-semibold rounded-lg transition-colors hover:bg-red-700"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                        }}
                                    >
                                        Thêm vào giỏ
                                    </button> */}
                                </div>
                            </Link>
                        ))
                )}
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;

