import React, { useState } from "react";

const SidebarMenu = () => {
    const [activeCategory, setActiveCategory] = useState(null); // Track active category when hovered

    const productCategories = [
        {
            id: 1,
            label: "Điện thoại",
            subCategories: [
                { id: 1, title: "Apple (iPhone)", items: ["iPhone 16 Series", "iPhone 15 Series", "iPhone 14 Series"] },
                { id: 2, title: "Samsung", items: ["Galaxy AI", "Galaxy S Series", "Galaxy A Series"] },
                { id: 3, title: "Xiaomi", items: ["Poco Series", "Xiaomi Series", "Redmi Note Series"] },
            ],
        },
        {
            id: 2,
            label: "Laptop",
            subCategories: [
                { id: 1, title: "MacBook", items: ["MacBook Pro", "MacBook Air"] },
                { id: 2, title: "Dell", items: ["XPS Series", "Inspiron Series"] },
                { id: 3, title: "HP", items: ["Spectre", "Pavilion"] },
            ],
        },
        {
            id: 3,
            label: "Phụ kiện",
            subCategories: [
                { id: 1, title: "Tai nghe", items: ["AirPods", "Sony WH-1000XM5"] },
                { id: 2, title: "Sạc dự phòng", items: ["Xiaomi Power Bank", "Anker PowerCore"] },
            ],
        },
    ];

    return (
        <div className="relative flex min-h-screen bg-gray-50">
            {/* Sidebar Menu */}
            <div className="w-64 bg-white border-r p-4 shadow-md cursor-pointer">
                <span className="font-medium text-gray-700 text-lg">Danh mục</span>

                {/* Hiển thị các danh mục luôn luôn */}
                <ul className="space-y-2">
                    {productCategories.map((category) => (
                        <li
                            key={category.id}
                            className="relative group cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md transition"
                            onMouseEnter={() => setActiveCategory(category.id)} // Set active category on hover
                            onMouseLeave={() => setActiveCategory(null)} // Clear active category when mouse leaves
                        >
                            {category.label}

                            {/* Hiển thị các danh mục con ở cùng một vị trí */}
                            {activeCategory === category.id && (
                                <div className="absolute left-16 top-0 bg-white shadow-lg border rounded-md w-64 mt-2 z-10">
                                    <div className="grid grid-cols-1 gap-4 p-4">
                                        {category.subCategories.map((subCategory) => (
                                            <div key={subCategory.id}>
                                                <h3 className="font-semibold text-gray-800 mb-2">{subCategory.title}</h3>
                                                <ul className="space-y-1">
                                                    {subCategory.items.map((item, index) => (
                                                        <li
                                                            key={index}
                                                            className="text-gray-600 hover:text-blue-500 cursor-pointer transition"
                                                        >
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
                <h1 className="text-xl font-bold">Nội dung chính</h1>
            </div>
        </div>
    );
};

export default SidebarMenu;
