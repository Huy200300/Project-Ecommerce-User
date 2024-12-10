import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryAip from '../common';
import calculateDiscount from '../helpers/calculateDiscount';
import displayCurrency from '../helpers/displayCurrency';

const SearchProduct = () => {
  const search = useLocation().search;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    price: '',
    category: '',
    brand: '',
  });

  const fetchData = async () => {
    setLoading(true);
    const filterQuery = new URLSearchParams();

    if (filters.price) filterQuery.append('price', filters.price);
    if (filters.category) filterQuery.append('category', filters.category);
    if (filters.brand) filterQuery.append('brand', filters.brand);

    const queryString = search + '&' + filterQuery.toString();

    const dataResponse = await fetch(SummaryAip.search_product.url + queryString, {
      method: SummaryAip.search_product.method,
      credentials: 'include',
    });

    setLoading(false);
    const dataApi = await dataResponse?.json();
    setData(dataApi?.data);
  };

  useEffect(() => {
    fetchData();
  }, [search, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const URLSearch = new URLSearchParams(search);
  const searchQuery = URLSearch.getAll('q');

  const handleDetails = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 mt-10">
      <p className="text-2xl mb-6 font-semibold text-gray-800">
        Tìm kiếm: <span className="text-blue-600">{searchQuery}</span> ({data?.length} sản phẩm)
      </p>

      <div className="grid grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Bộ lọc</h2>
          {/* Price Filter */}
          <div className="mb-4">
            <label htmlFor="price" className="block font-medium mb-2 text-gray-600">
              Giá
            </label>
            <select
              name="price"
              id="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả</option>
              <option value="0-100000">Dưới 100,000 VND</option>
              <option value="100000-500000">100,000 - 500,000 VND</option>
              <option value="500000-1000000">500,000 - 1,000,000 VND</option>
              <option value="1000000">Trên 1,000,000 VND</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label htmlFor="category" className="block font-medium mb-2 text-gray-600">
              Danh mục
            </label>
            <select
              name="category"
              id="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả</option>
              <option value="mobiles">Điện thoại</option>
              <option value="laptops">Máy tính xách tay</option>
              <option value="ipad">Máy tính bảng</option>
              <option value="accessory">Phụ kiện</option>
            </select>
          </div>

          {/* Brand Filter */}
          <div className="mb-4">
            <label htmlFor="brand" className="block font-medium mb-2 text-gray-600">
              Thương hiệu
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              placeholder="Ví dụ: Apple, Samsung"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="col-span-3">
          {loading && <p className="text-lg text-center text-gray-600">Đang tải dữ liệu...</p>}
          {data?.length === 0 && !loading && (
            <p className="bg-white text-lg text-center p-6 text-gray-700">Không tìm thấy sản phẩm...</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((product) => (
              <div
                key={product?._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl p-4 transition-shadow duration-300">
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className="object-scale-down h-56 hover:scale-110 transition-all mix-blend-multiply"
                />
                <h3 className="text-lg font-semibold mt-2 text-gray-800">{product?.productName}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-red-600 font-bold">
                    {displayCurrency(product?.sellingPrice)}
                  </p>
                  {calculateDiscount(product?.price, product?.sellingPrice) !== 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      -{calculateDiscount(product?.price, product?.sellingPrice)}%
                    </p>
                  )}
                </div>
                <p className="line-through text-gray-500">{displayCurrency(product?.price)}</p>
                <button
                  onClick={(e) => handleDetails(e, product?._id)}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
