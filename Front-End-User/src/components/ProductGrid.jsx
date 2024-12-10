import React from 'react';
import ProductCard from './ProductCard';
import { MdGridView, MdViewList } from "react-icons/md";

const ProductGrid = ({ totalPages, viewMode, setViewMode, handleCompare, loading, isFavorite, handleAddToCart, handleFavoriteClick, currentPage, changePage, data, handleSortBy, sortBy, handleLimitChange, limit }) => {
    return (
        !loading &&
        <div className="md:w-3/4 w-full p-4">
            <div className="flex justify-between items-center mb-4">
                <div className='flex gap-10 items-center mb-4'>
                    <div className="flex items-center">
                        <label className="mr-2 text-gray-700 text-sm font-semibold">Lọc:</label>
                        <select className="border p-1 outline-none font-semibold" value={sortBy} onChange={handleSortBy}>
                            <option value="">Chọn</option>
                            <option value="asc">Giá: Từ Thấp đến Cao</option>
                            <option value="dsc">Giá: Từ Cao đến Thấp</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2 text-gray-700 text-sm font-semibold">Hiển thị:</label>
                        <select className="border p-1 outline-none font-semibold"
                            value={limit}
                            onChange={handleLimitChange}
                        >
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select>
                    </div>
                </div>
                <div className="">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <button
                            className={`p-2 rounded flex items-center justify-center ${viewMode === "grid" ? "bg-red-500 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => setViewMode("grid")}
                        >
                            <MdGridView size={24} />
                        </button>
                        <button
                            className={`p-2 rounded flex items-center justify-center ${viewMode === "list" ? "bg-red-500 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => setViewMode("list")}
                        >
                            <MdViewList size={24} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={viewMode === "grid" ? "grid md:grid-cols-3 grid-cols-2 gap-4" : "flex flex-col gap-4"}>
                <ProductCard handleCompare={handleCompare} data={data} isFavorite={isFavorite} loading={loading} handleAddToCart={handleAddToCart} handleFavoriteClick={handleFavoriteClick} />
            </div>

            <div className="mt-4 flex justify-center">
                {Array?.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => changePage(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
