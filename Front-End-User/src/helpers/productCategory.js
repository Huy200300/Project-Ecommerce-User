import { CiMobile3 } from "react-icons/ci";
import { IoMdWatch } from "react-icons/io";
import { FaTabletAlt, FaTv, FaHeadphones } from "react-icons/fa";
import { MdLaptop } from "react-icons/md";

const productCategory = [
  {
    id: 1,
    label: "Điện Thoại",
    subCategories: [
      {
        id: 1,
        title: "Apple (iPhone)",
        items: ["iPhone 16 Series", "iPhone 15 Series", "iPhone 14 Series"],
      },
      {
        id: 2,
        title: "Samsung",
        items: ["Galaxy AI", "Galaxy S Series", "Galaxy A Series"],
      },
      {
        id: 3,
        title: "Xiaomi",
        items: ["Poco Series", "Xiaomi Series", "Redmi Note Series"],
      },
    ],
    value: "mobiles",
    icon: <CiMobile3 />,
  },
  {
    id: 2,
    label: "Laptop",
    value: "laptop",
    icon: <MdLaptop />,
  },
  {
    id: 3,
    label: "Máy Tính Bảng",
    value: "ipad",
    icon: <FaTabletAlt />,
  },
  {
    id: 4,
    label: "Tivi",
    value: "televisions",
    icon: <FaTv />,
  },
  {
    id: 5,
    label: "Đồng Hồ",
    value: "watches",
    icon: <IoMdWatch />,
  },
  {
    id: 6,
    label: "Phụ kiện",
    value: "accessory",
    icon: <FaHeadphones />,
  },
];

export default productCategory;
