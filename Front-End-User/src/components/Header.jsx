import React, { useState, useCallback, useEffect } from 'react';
import logo from "../assets/logo_transparent.png";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SummaryAip from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Dropdown from './Dropdown';
import { FaBars } from "react-icons/fa";
import FavoritesDropdown from './FavoritesDropdown';
import SearchDropdown from './SearchDropdown';
import productCategory from '../helpers/productCategory';
import { BiChevronDown } from 'react-icons/bi';
import iphone from '../assets/133_logo_apple_a96d38701f.png';
import samsung from '../assets/samsung_icon_menu_80d224e1c9.png';
import oppo from '../assets/25_logo_oppo_5fa74f12b2.png';
import xiaomi from '../assets/18_logo_xiaomi_b7c20fd2cd.svg'
import asus from '../assets/1_logo_asus_62f06660f1.svg'
import acer from '../assets/9_logo_acer_e50fcdd1b5.png'
import lg from '../assets/lg-OI70q3.png'
import fetchDataTopSelling from '../helpers/fetchDataTopSelling';
import translatedCategory from '../helpers/translatedCategory';
import displayCurrency from '../helpers/displayCurrency';

const Header = () => {
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const location = useLocation();
    const [isHovering, setIsHovering] = useState(false);
    const [isHoveringLabel, setIsHoveringlabel] = useState(null);
    const [data, setData] = useState([])
    const [isCategory, setIsCategory] = useState('');


    const closeAllDropdowns = () => {
        setIsDropdownOpen(false);
        setIsFavoritesOpen(false);
        setMenuDisplay(false)
    };

    const handleLogOut = useCallback(async () => {
        const response = await fetch(SummaryAip.logout_user.url, {
            method: SummaryAip.logout_user.method,
            credentials: "include"
        });
        const data = await response.json();
        if (data?.success) {
            localStorage?.removeItem('userData');
            toast?.success(data?.message);
            dispatch(setUserDetails(null));
            navigate("/");
        } else {
            toast?.error(data?.message);
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        closeAllDropdowns();
    }, [location]);

    const fetchProductSuggestions = async (query) => {
        try {
            const response = await fetch(`${SummaryAip.getSearchName.url}?query=${query}`, {
                method: SummaryAip.getSearchName.method,
                credentials: "include"
            });
            const result = await response.json();
            if (result?.success) {
                setFilteredSuggestions(result?.data);
            }
        } catch (error) {
            console.error("Error fetching product suggestions:", error);
        }
    };

    const handleSearchChange = useCallback((value) => {
        setSearch(value);
        if (value) {
            fetchProductSuggestions(value);
        } else {
            setFilteredSuggestions([]);
        }
    }, []);

    const handleSearchSelect = (suggestion) => {
        setFilteredSuggestions([]);
        navigate(`/product/${suggestion?._id}`);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const close = (setIsOpen, setIsOpenT) => {
        setIsOpen(false)
        setIsOpenT(false)
    }

    const brandMenus = {
        mobiles: [
            { label: 'iPhone', value: "apple", icon: iphone },
            { label: 'Samsung', value: "samsung", icon: samsung },
            { label: 'OPPO', value: "oppo", icon: oppo },
        ],
        laptop: [
            { label: 'MacBook', value: "apple", icon: iphone },
            { label: 'Asus', value: "asus", icon: asus },
            { label: 'Acer', value: "acer", icon: acer },
        ],
        ipad: [
            { label: 'iPad Air', value: "apple", icon: iphone },
            { label: 'Samsung', value: "samsung", icon: samsung },
            { label: 'OPPO', value: "oppo", icon: oppo },
        ],
        watches: [
            { label: 'Apple Watch', value: "apple", icon: iphone },
            { label: 'Samsung', value: "samsung", icon: samsung },
            { label: 'Xiaomi', value: "xiaomi", icon: xiaomi },
        ],
        televisions: [
            { label: 'Samsung', value: "samsung", icon: samsung },
            { label: 'LG', value: "lg", icon: lg },
            { label: 'Xiaomi', value: "xiaomi", icon: xiaomi },
        ],
    };

    const brandMenu = brandMenus[isCategory] || [];


    const fetchData = async (selectedCategory, limit = 3) => {
        const res = await fetchDataTopSelling(selectedCategory, limit)
        setData(res?.data);
    };

    useEffect(() => {
        fetchData(isCategory)
    }, [isCategory])

    const handleProductDetails = (e, id) => {
        e.preventDefault();
        navigate(`/product/${id}`)
        setIsHovering(false)
        setIsHoveringlabel(false)
        setIsCategory("")
    }

    const handleCategoryProduct = (e, category) => {
        e.preventDefault();
        navigate(`/product-category?category=${isCategory}&brand=${category}`)
        setIsHovering(false)
        setIsHoveringlabel(false)
        setIsCategory("")
    }

    return (
        <div>
            <header>
                <div className='py-2.5 bg-slate-900'>
                    <div className="md:max-w-screen-xl w-full px-4 gap-2 mx-auto flex text-white md:flex-row flex-col md:items-center md:justify-between">
                        <ul className="header-links pull-left flex gap-4 text-xs">
                            <li><Link to={"#"} className='flex items-center gap-2'><FaPhoneAlt className='text-red-500' /> +096-688-53-18</Link></li>
                            <li><Link to={"#"} className='flex items-center gap-2'><IoMdMail className='text-red-500' /> taihuy200300@gmail.com</Link></li>
                            <li><Link to={"#"} className='flex items-center gap-2'><FaMapMarkerAlt className='text-red-500' /> 1734 Stonecoal Road</Link></li>
                        </ul>
                        <ul className="header-links pull-right flex gap-4 text-xs">
                            {
                                user?._id ? (
                                    <li><Link to={"/"} className='flex items-center gap-2'><FaUser className='text-red-500' />Chào {user?.name}</Link></li>
                                ) : (
                                    <li><Link to={"/login"} className='flex items-center gap-2'><FaUser className='text-red-500' />Tài Khoản</Link></li>
                                )
                            }

                        </ul>
                    </div>
                </div>

                <div id="header" className='bg-black py-4'>
                    <div className="md:max-w-screen-xl header_top mx-auto">
                        <div className="flex flex-wrap md:flex-row flex-col items-center -mx-2">
                            <div className=" w-full md:w-1/4 md:block flex justify-center">
                                <div className="float-left p-3">
                                    <Link to={"/"} className="logo">
                                        <img src={logo} alt="logo" className="overflow-hidden md:h-12 h-20 md:w-32 w-40" />
                                    </Link>
                                </div>
                            </div>

                            <div className="w-full md:w-2/4">
                                <div className="py-0 md:px-3.5 px-5">
                                    <form className="relative flex" onSubmit={(e) => e.preventDefault()}>
                                        <div
                                            className="relative inline-block bg-white rounded-l-full text-nowrap"
                                            onMouseEnter={() => setIsHovering(true)}
                                            onMouseLeave={() => setIsHovering(false)}
                                        >
                                            <button className="input-select flex justify-center items-center font-semibold rounded-s-full h-10 py-0 px-3.5 outline-none shadow-sm border border-gray-300">
                                                Danh Mục
                                                <BiChevronDown className="ml-2 text-lg" />
                                            </button>

                                            {isHovering && (
                                                <ul className="absolute flex flex-col gap-9 group z-50 md:-left-[50%] h-[375px] md:w-[760px] w-[725px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                                                    {productCategory?.map((category) => (
                                                        <li
                                                            key={category?.id}
                                                            style={{ paddingRight: category?.paddingRight }}
                                                            className="relative w-fit group flex items-center md:px-4 px-1 py-3 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                                                            onMouseEnter={() => {
                                                                setIsHoveringlabel(category?.id)
                                                                setIsCategory(category?.value)
                                                            }}
                                                            onMouseLeave={() => {
                                                                setIsHoveringlabel(null)
                                                                setIsCategory('')
                                                            }}

                                                        >
                                                            <span className="mr-1 text-xl text-red-300">{category?.icon}</span>
                                                            <span className="text-black font-medium">{category?.label}</span>
                                                            {isHoveringLabel === category?.id && (
                                                                <div style={{ top: category?.top }} className='absolute flex left-[100%] bg-white border-x-2 w-[590px] h-96 z-50 md:p-4 p-3 transform transition-all duration-200'>
                                                                    <div className='w-2/3 border-r-2'>
                                                                        <div className='font-bold mb-3 text-lg capitalize'>Thương hiệu nổi bật</div>
                                                                        <div className="flex gap-2 items-center mb-5">
                                                                            {brandMenu.map((br, index) => (
                                                                                <div
                                                                                    onClick={(e) => handleCategoryProduct(e, br.value)}
                                                                                    key={index}
                                                                                    className="flex gap-1 flex-row items-center justify-center text-center border border-gray-200 rounded-md p-2 w-28 h-16"
                                                                                >
                                                                                    <img
                                                                                        src={br.icon}
                                                                                        alt={br.value}
                                                                                        className="h-10 w-10 object-contain mb-2"
                                                                                    />
                                                                                    <span className="text-xs font-medium text-gray-700">
                                                                                        {br.label}
                                                                                    </span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className=''>
                                                                            <div className="grid grid-cols-2 gap-5 items-center justify-center">
                                                                                {category?.subCategories?.map((subCategory) => (
                                                                                    <div key={subCategory?.id}>
                                                                                        <h3 className="font-semibold text-gray-800 mb-1.5">{subCategory?.title}</h3>
                                                                                        <ul className="space-y-1">
                                                                                            {subCategory?.items?.map((item, index) => (
                                                                                                <li
                                                                                                    key={index}
                                                                                                    className="text-gray-600 hover:text-red-500 font-semibold cursor-pointer transition-colors duration-200"
                                                                                                >
                                                                                                    {item}
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='md:px-2 px-1 mt-5'>
                                                                        <div className='font-bold mb-3 text-sm capitalize'>Bán chạy nhất</div>
                                                                        <div className="space-y-6 w-full">
                                                                            {
                                                                                data?.map((product, i) =>
                                                                                    <div onClick={(e) => handleProductDetails(e, product?._id)} key={i} className="flex group items-center space-x-3 w-full cursor-pointer">
                                                                                        <img src={product?.productImage[0]} alt={product?.productName} className="w-12 h-12 object-cover" />
                                                                                        <div className='w-full'>
                                                                                            <p className="text-gray-500 text-xs">{translatedCategory(product?.category)}</p>
                                                                                            <p className="text-wrap text-xs group-hover:text-red-500 font-bold w-28 text-ellipsis truncate-2-lines break-words overflow-hidden">
                                                                                                {product?.productName}
                                                                                            </p>
                                                                                            <p className="text-red-500 flex flex-col  group-hover:text-black text-xs font-bold">
                                                                                                {displayCurrency(product?.sellingPrice)}
                                                                                                <span className="line-through text-gray-500">{displayCurrency(product?.price)}</span>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                             )} 
                                        </div>
                                        <SearchDropdown
                                            suggestions={filteredSuggestions}
                                            search={search}
                                            onSearchChange={handleSearchChange}
                                            onSearchSelect={handleSearchSelect}
                                        />
                                    </form>
                                </div>
                            </div>


                            <div className="md:w-1/4 w-full">
                                <div className="header-ctn flex items-center justify-end md:gap-2 gap-6 mt-2 md:px-3.5 px-10 md:py-0 py-5 ">
                                    <div className='relative flex justify-center'>
                                        {user?._id && (
                                            <div className='text-white flex flex-col items-center'>
                                                <div className='text-3xl cursor-pointer ' onClick={() => {
                                                    setMenuDisplay(!menuDisplay);
                                                    if (!menuDisplay) close(setIsDropdownOpen, setIsFavoritesOpen)
                                                }}>
                                                    {user?.avatar ? (
                                                        <img src={user?.avatar} alt={user?.name} className='w-7 h-7 rounded-full' />
                                                    ) : (
                                                        <FaUserCircle title='Tài Khoản' />
                                                    )}
                                                </div>
                                                <div className='cursor-pointer text-sm font-medium' >
                                                    {user?.name ? user?.name : "Tài Khoản"}
                                                </div>
                                            </div>
                                        )}
                                        {menuDisplay && (
                                            <div onClick={closeAllDropdowns} className='absolute font-semibold bg-white bottom-0 top-14 z-40 h-fit p-2 shadow-lg rounded'>
                                                <nav>
                                                    <Link to="/profile" className='whitespace-nowrap hidden md:block hover:bg-slate-200 p-2'>
                                                        Thông tin tài khoản
                                                    </Link>
                                                    <Link to="/order" className='whitespace-nowrap hidden md:block hover:bg-slate-200 p-2'>
                                                        Đơn hàng của bạn
                                                    </Link>
                                                    <button onClick={handleLogOut} className='w-full text-start whitespace-nowrap hidden md:block hover:bg-slate-200 p-2'>
                                                        Đăng Xuất
                                                    </button>
                                                </nav>
                                            </div>
                                        )}
                                    </div>

                                    <FavoritesDropdown
                                        isOpen={isFavoritesOpen}
                                        toggleDropdown={() => {
                                            setIsFavoritesOpen(!isFavoritesOpen);
                                            if (!isFavoritesOpen) close(setIsDropdownOpen, setMenuDisplay)
                                        }}
                                        closeAll={closeAllDropdowns}
                                    />

                                    <Dropdown
                                        isOpen={isDropdownOpen}
                                        toggleDropdown={() => {
                                            setIsDropdownOpen(!isDropdownOpen);
                                            if (!isDropdownOpen) close(setIsFavoritesOpen, setMenuDisplay)
                                        }}
                                        closeAll={closeAllDropdowns}
                                    />

                                    <div className="menu-toggle md:hidden block">
                                        <div className='flex flex-col items-center text-white cursor-pointer' onClick={toggleMenu}>
                                            <FaBars className='flex md:text-lg text-sm items-center md:w-7 w-5 h-5 md:h-7' />
                                            <span className='text-sm'>Menu</span>
                                        </div>
                                    </div>
                                    {isMenuOpen && (
                                        <div className="absolute top-0 left-0 w-64 h-screen bg-black bg-opacity-90 z-50">
                                            <div className="flex justify-end p-4">
                                                <FaTimes className="cursor-pointer text-2xl text-white" onClick={closeMenu} />
                                            </div>
                                            <ul className="mt-4 p-4 text-white">
                                                <li className="relative group py-5 text-current">
                                                    <Link onClick={closeMenu} to={"/"} className='hover:text-[#D10024] font-semibold'>
                                                        Trang chủ
                                                        <span className=" outline-none absolute left-0 bottom-5 w-0 h-[2px] bg-[#D10024] hover:text-[#D10024] transition-all duration-200 group-hover:w-full focus:w-full"></span>
                                                    </Link>
                                                </li>
                                                <li className="relative group py-5 text-current">
                                                    <Link onClick={closeMenu} to={"/hotdeal"} className='hover:text-[#D10024] font-semibold'>
                                                        Hot Deals
                                                        <span className=" outline-none absolute left-0 bottom-5 w-0 h-[2px] bg-[#D10024] hover:text-[#D10024] transition-all duration-200 group-hover:w-full focus:w-full"></span>
                                                    </Link>
                                                </li>
                                                <li className="relative group py-5 text-current">
                                                    <Link onClick={closeMenu} to={"/product-category?category=ipad"} className='hover:text-[#D10024] font-semibold'>
                                                        Máy Tính Bảng
                                                        <span className=" outline-none absolute left-0 bottom-5 w-0 h-[2px] bg-[#D10024] hover:text-[#D10024] transition-all duration-200 group-hover:w-full focus:w-full"></span>
                                                    </Link>
                                                </li>
                                                <li className="relative group py-5 text-current">
                                                    <Link onClick={closeMenu} to={"/product-category?category=laptop"} className='hover:text-[#D10024] font-semibold'>
                                                        Laptops
                                                        <span className=" outline-none absolute left-0 bottom-5 w-0 h-[2px] bg-[#D10024] hover:text-[#D10024] transition-all duration-200 group-hover:w-full focus:w-full"></span>
                                                    </Link>
                                                </li>
                                                <li className="relative group py-5 text-current">
                                                    <Link onClick={closeMenu} to={"/product-category?category=mobiles"} className='hover:text-[#D10024] font-semibold'>
                                                        Điện Thoại
                                                        <span className=" outline-none absolute left-0 bottom-5 w-0 h-[2px] bg-[#D10024] hover:text-[#D10024] transition-all duration-200 group-hover:w-full focus:w-full"></span>
                                                    </Link>
                                                </li>
                                                <li className="relative group py-5 text-current">
                                                    <Link onClick={closeMenu} to={"/product-category?category=watches"} className='hover:text-[#D10024] font-semibold'>
                                                        Đồng Hồ
                                                        <span className=" outline-none absolute left-0 bottom-5 w-0 h-[2px] bg-[#D10024] hover:text-[#D10024] transition-all duration-200 group-hover:w-full focus:w-full"></span>
                                                    </Link>
                                                </li>
                                                <li className="relative group py-5 text-current">
                                                    <Link onClick={closeMenu} to={"/product-category?category=accessory"} className='hover:text-[#D10024] font-semibold'>
                                                        Phụ Kiện
                                                        <span className=" outline-none absolute left-0 bottom-5 w-0 h-[2px] bg-[#D10024] hover:text-[#D10024] transition-all duration-200 group-hover:w-full focus:w-full"></span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <nav id="navigation" className='bg-white border-b-2 border-t-[3px] border-t-[#D10024] '>
                <div className="max-w-screen-xl mx-auto hidden md:block">
                    <div id="responsive-nav" >
                        <div className="main-nav nav navbar-nav flex">
                            <div className="p-3 relative group inline-block">
                                <Link to={"/hotdeal"} className="relative font-semibold text-current focus:outline-none after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D10024] after:transition-all after:duration-200 group-hover:after:w-full focus:after:w-full">
                                    Hot Deals
                                </Link>
                            </div>
                            <div className="p-3 relative group inline-block">
                                <Link to={"/product-category?category=ipad"} className="relative font-semibold text-current focus:outline-none after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D10024] after:transition-all after:duration-200 group-hover:after:w-full focus:after:w-full">
                                    Máy Tính Bảng
                                </Link>
                            </div>
                            <div className="p-3 relative group inline-block">
                                <Link to={"/product-category?category=laptop"} className="relative font-semibold text-current focus:outline-none after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D10024] after:transition-all after:duration-200 group-hover:after:w-full focus:after:w-full">
                                    Laptops
                                </Link>
                            </div>
                            <div className="p-3 relative group inline-block">
                                <Link to={"/product-category?category=mobiles"} className="relative font-semibold text-current focus:outline-none after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D10024] after:transition-all after:duration-200 group-hover:after:w-full focus:after:w-full">
                                    Điện Thoại
                                </Link>
                            </div>
                            <div className="p-3 relative group inline-block">
                                <Link to={"/product-category?category=watches"} className="relative font-semibold text-current focus:outline-none after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D10024] after:transition-all after:duration-200 group-hover:after:w-full focus:after:w-full">
                                    Đồng Hồ
                                </Link>
                            </div>
                            <div className="p-3 relative group inline-block">
                                <Link to={"/product-category?category=accessory"} className="relative font-semibold text-current focus:outline-none after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D10024] after:transition-all after:duration-200 group-hover:after:w-full focus:after:w-full">
                                    Phụ Kiện
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
