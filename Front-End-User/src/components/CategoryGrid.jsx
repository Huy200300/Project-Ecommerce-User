import React from "react";
import dt from '../assets/dien_thoai_thumb_2_e6be721634.png'
import lt from '../assets/laptop_thumb_2_4df0fab60f.png'
import pk from '../assets/phu_kien_thum_2_21c419aa09.png'
import ip from '../assets/may_tinh_bang_cate_thumb_00e3b3eefa.png'
import dh from '../assets/dong_ho_cate_thumb_fefdd822ba.png'
import tv from '../assets/tivi_thumb_2_fc9b0f8bde.png'
import ap from '../assets/img-icon-apple.webp'
import cm from '../assets/OIP.jpg'
import { Link } from "react-router-dom";

const CustomGrid = () => {
    const categories = [
        {
            label: "Điện Thoại",
            value: "mobiles", image: dt, className: "row-span-2", width: "w-180", height: "w-180", flex: "flex-col"
        },
        {
            label: "Laptop",
            value: "laptop", image: lt, className: "", width: "w-20", height: "h-20", gap: "gap-14"
        },
        {
            label: "Phụ Kiện",
            value: "accessory", image: pk, className: "col-start-2 row-start-2", width: "w-20", height: "h-20", gap: "gap-14"
        },
        {
            label: "Ipad",
            value: "ipad", image: ip, className: "col-start-3 row-start-1", width: "w-20", height: "h-20", gap: "gap-14"
        },
        {
            label: "Đồng Hồ",
            value: "watches", image: dh, className: "col-start-3 row-start-2", width: "w-20", height: "h-20", gap: "gap-14"
        },
        {
            label: "Tivi",
            value: "televisions", image: tv, className: "row-span-2 col-start-4 row-start-1", width: "w-180", height: "h-180",
        },
        // {
        //     label: "Apple",
        //     value: "apple", image: ap, className: "col-start-5 row-start-1", width: "w-[80px]", height: "h-[80px]", gap: "gap-14"
        // },
        // {
        //     label: "Camera",
        //     value: "camera", image: cm, className: "col-start-5 row-start-2", width: "w-20", height: "h-20", gap: "gap-14"
        // },
    ];

    return (
        <div className="container mx-auto my-10 border">
            <div className="grid grid-cols-4 grid-rows-2 gap-4 max-h-[180px]">
                {categories.map((category, index) => (
                    <Link to={`/product-category?category=${category.value}`}
                        key={index}
                        className={`bg-white rounded-lg shadow-md p-4 flex ${category.gap} ${category.flex} ${category.className}`}
                    >
                        <div className="flex items-start mb-4">
                            <p className="text-gray-700 font-semibold text-left w-full">{category.label}</p>
                        </div>
                        <div className="overflow-hidden rounded-md flex justify-center items-center relative">
                            <img
                                src={category.image}
                                alt={category.name}
                                className={`object-cover ${category.height} ${category.width} transition-transform duration-300 hover:scale-110`}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CustomGrid;
