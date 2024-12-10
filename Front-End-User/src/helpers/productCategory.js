import { CiMobile3 } from "react-icons/ci";
import { IoMdWatch } from "react-icons/io";
import { FaTabletAlt, FaTv } from "react-icons/fa";
import { MdLaptop } from "react-icons/md";

const productCategory = [
  {
    id: 1,
    label: "Điện Thoại",
    top: "-8px",
    paddingRight: "40px",
    subCategories: [
      {
        id: 1,
        title: "Apple (iPhone)",
        items: ["iPhone 16 Series", "iPhone 15 Series"],
      },
      {
        id: 2,
        title: "Samsung",
        items: ["Galaxy AI", "Galaxy S Series"],
      },
      {
        id: 3,
        title: "Xiaomi",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 4,
        title: "Xiaomi",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 5,
        title: "Xiaomi",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 6,
        title: "Xiaomi",
        items: ["Poco Series", "Xiaomi Series"],
      },
    ],
    value: "mobiles",
    icon: <CiMobile3 />,
  },
  {
    id: 2,
    label: "Laptop",
    top: "-90px",
    paddingRight: "70px",
    subCategories: [
      {
        id: 1,
        title: "Apple (Macbook)",
        items: ["iPhone 16 Series", "iPhone 15 Series"],
      },
      {
        id: 2,
        title: "Asus",
        items: ["Galaxy AI", "Galaxy S Series"],
      },
      {
        id: 3,
        title: "Acer",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 4,
        title: "Dell",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 5,
        title: "HP",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 6,
        title: "Lenovo",
        items: ["Poco Series", "Xiaomi Series"],
      },
    ],
    value: "laptop",
    icon: <MdLaptop />,
  },
  {
    id: 3,
    label: "Máy Tính Bảng",
    top: "-175px",
    paddingRight: "10px",
    subCategories: [
      {
        id: 1,
        title: "Apple (iPad)",
        items: ["iPhone 16 Series", "iPhone 15 Series"],
      },
      {
        id: 2,
        title: "Samsung",
        items: ["Galaxy AI", "Galaxy S Series"],
      },
      {
        id: 3,
        title: "OPPO",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 4,
        title: "Xiaomi",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 5,
        title: "Masstel",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 6,
        title: "Lenovo",
        items: ["Poco Series", "Xiaomi Series"],
      },
    ],
    value: "ipad",
    icon: <FaTabletAlt />,
  },
  {
    id: 4,
    label: "Đồng Hồ",
    top: "-260px",
    paddingRight: "60px",
    subCategories: [
      {
        id: 1,
        title: "Apple (Watch)",
        items: ["iPhone 16 Series", "iPhone 15 Series"],
      },
      {
        id: 2,
        title: "Samsung",
        items: ["Galaxy AI", "Galaxy S Series"],
      },
      {
        id: 3,
        title: "Huawei",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 4,
        title: "Xiaomi",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 5,
        title: "Masstel",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 6,
        title: "Garmin",
        items: ["Poco Series", "Xiaomi Series"],
      },
    ],
    value: "watches",
    icon: <IoMdWatch />,
  },
  {
    id: 5,
    label: "Tivi",
    top: "-345px",
    paddingRight: "105px",
    subCategories: [
      {
        id: 1,
        title: "Casper",
        items: ["iPhone 16 Series", "iPhone 15 Series"],
      },
      {
        id: 2,
        title: "Samsung",
        items: ["Galaxy AI", "Galaxy S Series"],
      },
      {
        id: 3,
        title: "LG",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 4,
        title: "Xiaomi",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 5,
        title: "Sony",
        items: ["Poco Series", "Xiaomi Series"],
      },
      {
        id: 6,
        title: "TCL",
        items: ["Poco Series", "Xiaomi Series"],
      },
    ],
    value: "televisions",
    icon: <FaTv />,
  },
];

export default productCategory;
