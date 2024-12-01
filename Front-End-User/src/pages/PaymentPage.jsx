import React, { useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import Context from '../context';
import SummaryAip from '../common';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAddressSelection from '../helpers/useAddressSelection';
import GenericModal from '../components/GenericModal';
import { useSelector } from 'react-redux';
import TermsModal from '../components/TermsModal';
import { useSelectedProducts } from '../context/SelectedProducts';
import PaymentSummary from '../components/PaymentSummary';
import PaymentProducts from '../components/PaymentProducts';
import PaymentAddress from '../components/PaymentAddress';

const PaymentPage = () => {
    const { dataUser, fetchUserDetails } = useContext(Context);
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [paymentType, setPaymentType] = useState('');
    const [shippingMethod, setShippingMethod] = useState('FAST');
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [shippingFee, setShippingFee] = useState(20000);
    const { selectedProducts } = useSelectedProducts()
    const [dataShipping, setDataShipping] = useState([])
    const [showTerms, setShowTerms] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)


    const handleAcceptTerms = () => {
        setShowTerms(false);
        setIsOpen(true)
    };

    useEffect(() => {


    }, [selectedProducts]);


    useEffect(() => {
        if (!isOpen) {
            setShowTerms(true);
        }

    }, [isOpen]);


    const [data, setData] = useState({
        fullName: "",
        addressType: "",
        phone: "",
        defaultAddress: false,
        detailAddress: "",
        fullAddress: ""
    });

    const fetchDataShipping = async (user) => {
        const res = await fetch(`http://localhost:8080/api/user/${user}/address`, {
            method: "GET",
            "credentials": "include",
            headers: {
                "content-type": "application/json"
            },
        })
        const dataApi = await res.json()
        setDataShipping(dataApi?.data)
    }
    useEffect(() => { if (dataUser?._id) fetchDataShipping(dataUser?._id) }, [dataUser])

    const {
        selectedCity,
        setSelectedCity,
        selectedDistrict,
        setSelectedDistrict,
        selectedWard,
        setSelectedWard,
    } = useAddressSelection();

    const handleOnChange = (event) => {
        const { name, value, checked, type } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            if (data?.fullAddress) {
                const parts = data.fullAddress.split(' ');
                const city = parts.slice(0, 2).join(' ');
                const district = parts.slice(2, 4).join(' ');
                const ward = parts.slice(4).join(' ');

                setSelectedCity(city);
                setSelectedDistrict(district);
                setSelectedWard(ward);
            }
            isFirstRun.current = false;
        }
    }, [data?.fullAddress]);

    const [selectedAddress, setSelectedAddress] = useState(() => {
        if (!dataShipping || dataShipping?.length === 0) {
            return null;
        }
        const defaultAddr = dataShipping.find(address => address.defaultAddress);

        return defaultAddr || dataShipping[0];
    });

    useEffect(() => {
        if (!dataShipping || dataShipping?.length === 0) {
            setSelectedAddress(null);
            return;
        }

        const defaultAddr = dataShipping.find(address => address.defaultAddress);
        setSelectedAddress(defaultAddr || dataShipping[0]);
    }, [dataShipping]);

    useEffect(() => {
        if (!isFirstRun.current) {
            handleOnChange({
                target: {
                    name: 'fullAddress',
                    value: `${selectedCity} ${selectedDistrict} ${selectedWard}`
                }
            });
        }
    }, [selectedCity, selectedDistrict, selectedWard]);

    const handlePaymentMethodChange = (method, type) => {
        setPaymentMethod(method);
        if (method === 'vnpay') {
            setPaymentType(type);
        }
    };

    const handleUpdateInfo = async (e) => {
        e?.stopPropagation();
        e?.preventDefault();

        const dataResponse = await fetch(SummaryAip.add_new_address.url, {
            method: SummaryAip.add_new_address.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: dataUser?._id,
                ...data
            })
        });
        const dataApi = await dataResponse.json();
        if (dataApi?.success) {
            toast.success(dataApi?.message);
            fetchUserDetails();
            setIsOpenModalUpdateInfo(false);
        } else {
            if (!user) {
                setIsLoginOpen(true);
                toast.error(dataApi?.message);
            } else if (dataApi?.error) {
                toast.error(dataApi?.message);
            }

        }
    };

    const total = selectedProducts.reduce((total, product) => {
        return total + (product.sellingPrice * product.amount);
    }, 0) + shippingFee;

    const getSelectedProductInfo = (selectedProducts) => {
        return selectedProducts.map(product => ({
            productId: product._id,
            color: product.selectedColor || "",
            colorImage: product.selectedColorImage || product.productImage,
            stock: product.stock || product?.countInStock,
            price: product.price,
            sellingPrice: product.sellingPrice,
            quantity: product.amount,
            productName: product.productName
        }));
    };

    const handleLogin = () => {
        navigate('/login', { state: location?.pathname });
    }


    const handlePlaceOrder = async (e, productId) => {
        e?.stopPropagation();
        e?.preventDefault();

        if (!isOpen) {
            setShowTerms(true);
            return;
        }

        if (paymentMethod === 'vnpay') {
            await handleVNPayPayment(productId);
        } else if (paymentMethod === "momo") {
            await handleMomoPayment();
        } else {
            await handleCashOnDelivery()
        }
    };

    const makeApiRequest = async (url, method, body) => {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi gọi API.");
            console.error(error);
        }
    };

    const handleCashOnDelivery = async () => {
        const products = getSelectedProductInfo(selectedProducts);
        const body = {
            amount: total,
            userId: dataUser?._id,
            products,
            shipping: shippingFee,
            shippingMethod,
            shippingAddress: selectedAddress
        };
        const datas = await makeApiRequest(SummaryAip.payment_COD.url, SummaryAip.payment_COD.method, body);
        if (datas?.error) {
            handlePaymentError(datas);
        } else {
            window.location.href = `http://localhost:8080/api/payment-result?resultCode=0`;
        }
    }

    const handleVNPayPayment = async (productId) => {
        const body = {
            amount: total,
            language: "vn",
            bankCode: paymentType,
            userId: dataUser?._id,
            productId,
            shipping: shippingFee,
            shippingMethod,
            shippingAddress: data
        };

        const datas = await makeApiRequest(SummaryAip.payment_vnpay.url, SummaryAip.payment_vnpay.method, body);
        if (datas?.url) {
            window.location.href = datas.url;
        } else {
            handlePaymentError(datas);
        }
    };

    const handleMomoPayment = async () => {
        const products = getSelectedProductInfo(selectedProducts);
        const body = {
            amount: total,
            lang: "vi",
            userId: dataUser?._id,
            products,
            shipping: shippingFee,
            shippingMethod,
            shippingAddress: selectedAddress
        };

        const datas = await makeApiRequest(SummaryAip.payment_momo.url, SummaryAip.payment_momo.method, body);
        if (datas?.payUrl) {
            window.location.href = datas?.payUrl;
        } else {
            handlePaymentError(datas);
        }
    };

    const handlePaymentError = (datas) => {
        if (!user) {
            setIsLoginOpen(true);
            toast.error(datas?.message);
        } else if (datas?.error) {
            toast.error(datas?.message);
        }
    };

    const handleChange = (e) => {
        if (e.target.value === "shipping") {
            setIsOpenModalUpdateInfo(e.target.checked);
        } else if (e.target.value === "clause") {
            const isChecked = e.target.checked;

            if (!isChecked) {
                setShowTerms(true);
            } else {
                setIsOpen(isChecked);
            }
        }
    };

    const [shippingOrClause, setShippingOrClause] = useState({
        shipping: "shipping",
        clause: "clause"
    })

    return (
        <>
            {showTerms && <TermsModal onAccept={handleAcceptTerms} />}
            {
                !showTerms &&
                <div className="md:max-w-screen-xl mx-auto md:px-0 px-3 py-8">

                    <div className='flex relative items-end gap-5 pb-6'>
                        <h1 className="text-2xl font-bold uppercase">Thanh toán</h1>
                        <span className='font-medium'> <Link to={"/"} className='hover:text-red-500 capitalize cursor-pointer'>trang chủ</Link> / <Link to={"/cart"} className='hover:text-red-500 capitalize cursor-pointer'>giỏ hàng</Link> / Thanh Toán</span>
                        <div className='absolute bottom-0 left-1/2 -ml-[50vw] right-1/2 -mr-[50vw] h-0.5 bg-slate-200 z-10'></div>
                    </div>

                    <div className="grid mt-20 grid-cols-1 md:grid-cols-3 gap-6">
                        <div className='col-span-2'>
                            <PaymentProducts selectedProducts={selectedProducts} />
                            <PaymentAddress
                                dataShipping={dataShipping}
                                handleChange={handleChange}
                                handleUpdateInfo={handleUpdateInfo}
                                shippingOrClause={shippingOrClause}
                            />
                        </div>

                        <GenericModal
                            isOpen={isLoginOpen}
                            onClose={() => setIsLoginOpen(false)}
                            title='Xác nhận đăng nhập?'
                            children='Bạn có muốn đăng nhập để mua hàng không?'
                            footer={
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsLoginOpen(false)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
                                    >
                                        Không
                                    </button>
                                    <button
                                        onClick={handleLogin}
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                    >
                                        Có
                                    </button>
                                </div>
                            }
                        />

                        <PaymentSummary
                            handleChange={handleChange}
                            isOpen={isOpen}
                            total={total}
                            shippingOrClause={shippingOrClause}
                            shippingFee={shippingFee}
                            selectedProducts={selectedProducts}
                            paymentMethod={paymentMethod}
                            handlePaymentMethodChange={handlePaymentMethodChange}
                            handlePlaceOrder={handlePlaceOrder}
                        />
                    </div>
                </div>
            }
        </>

    );
};

export default PaymentPage;
