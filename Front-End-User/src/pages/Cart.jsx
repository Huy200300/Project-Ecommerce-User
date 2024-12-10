import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";
import Steps from '../components/Steps';
import EmptyCart from '../components/EmptyCart';
import CartContent from '../components/CartContent ';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';
import GenericModal from '../components/GenericModal';
import { toast } from 'react-toastify';
import FavoritesInCart from '../components/FavoritesInCart';


const Cart = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const { cart, updateCart, cartLength } = useCart();
    const loadingCart = new Array(cartLength).fill(null);
    const navigate = useNavigate();


    const handleDelete = useCallback((index) => {
        setProductToDelete(index);
        setShowModal(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        setLoading(true);
        const newCart = cart?.filter((item) => item?._id !== productToDelete);
        localStorage?.setItem('cart', JSON?.stringify(newCart));
        updateCart(newCart);
        setLoading(false);
        setShowModal(false);
        setProductToDelete(null);
    }, [cart, productToDelete, updateCart]);

    const handleAddCard = () => {
        const selectedItems = cart?.filter(product => selectedProducts?.includes(product._id));
        localStorage?.setItem('selectedProducts', JSON?.stringify(selectedItems));
        navigate('/payment')
    };

    const handleDeleteAll = () => {
        setLoading(true);
        const emptyCart = [];
        localStorage?.setItem('cart', JSON?.stringify(emptyCart));
        updateCart(emptyCart);
        setLoading(false);
        setIsOpen(false)
        setProductToDelete(null);
    }

    const itemsDelivery = [
        { title: '40.000 VND', value: 1, description: 'Dưới 1.000.000 VND' },
        { title: '25.000 VND', value: 2, description: 'Từ 1.000.000 VND đến dưới 10.000.000 VND' },
        { title: 'Free ship', value: 3, description: 'Trên 10.000.000 VND' }
    ];

    const selectedProductsTotalPrice = selectedProducts?.reduce((total, productId) => {
        const products = cart;
        const product = products?.find(p => p?._id === productId);
        if (product) {
            const quantity = product?.amount || 1;
            const price = product?.sellingPrice || 0;
            return total + (quantity * price);
        }
        return total;
    }, 0);

    const upQuantity = (id, type, max, selectedColor, selectedSize) => {
        if (max) {
            return toast.error("Số lượng không đủ");
        }
        if (type === "decrease") {
            updateCart({
                productId: id,
                selectedColor: selectedColor,
                selectedSize: selectedSize,
                quantityChange: -1,
            });
        } else {
            updateCart({
                productId: id,
                selectedColor: selectedColor,
                selectedSize: selectedSize,
                quantityChange: 1,
            });
        }
    };


    const toggleProductSelection = useCallback((productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected?.includes(productId)
                ? prevSelected?.filter(id => id !== productId)
                : [...prevSelected, productId]
        );
    }, []);

    const selectAllProducts = useCallback(() => {
        if (selectedProducts?.length === cartLength) {
            setSelectedProducts([]);
        } else {
            const allProductIds = cart?.map(item => item?._id);
            setSelectedProducts(allProductIds);
        }
    }, [selectedProducts, cart]);



    const hasItems = cartLength > 0;
    const selectedStorage = cart?.map(item => item?.selectedStorage);
    const isAllSelected = (selectedProducts?.length === cartLength && cartLength > 0);


    return (
        <div className='max-w-screen-xl mx-auto p-4'>
            <div className=''>
                {cartLength > 0 && <div className='flex relative items-end gap-5 pb-6'>
                    <h1 className="text-2xl font-bold uppercase">Giỏ Hàng</h1>
                    <span className='font-medium'> <Link to={"/"} className='hover:text-red-500 capitalize cursor-pointer'>trang chủ</Link> / Giỏ Hàng</span>
                    <div className='absolute bottom-0 left-1/2 -ml-[50vw] right-1/2 -mr-[50vw] h-0.5 bg-slate-200 z-10'></div>
                </div>
                }
                {/* {cartLength > 0 && (
                    <Steps totalAmount={selectedProductsTotalPrice} data={itemsDelivery} />
                )} */}
            </div>
            <FavoritesInCart />
            {hasItems ? (
                <div className='flex flex-col mt-0 lg:flex-row min-h-[calc(100vh-205px)] gap-10 lg:justify-between p-6'>
                    <div className='w-full max-w-3xl flex flex-col gap-2'>
                        <div className='border-2 rounded-md px-2 py-1'>
                            <div className='flex justify-between font-semibold items-center'>
                                <div className='flex gap-1'>
                                    <input type="checkbox" name="" id="" className='' checked={isAllSelected}
                                        onChange={selectAllProducts} />
                                    <span>Tất cả {cartLength} sản phẩm</span>
                                </div>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành Tiền</span>
                                <span>
                                    <button className='text-xl text-red-700 hover:text-red-500 cursor-pointer transition-all ease-in-out'
                                        onClick={() => setIsOpen(true)}
                                    >
                                        <IoTrashOutline className='text-xl' />
                                    </button>
                                </span>
                            </div>
                        </div>
                        {loading ? (
                            loadingCart?.map((el, index) => (
                                <div key={index + "Add To Cart Loading" + el} className='rounded w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse'></div>
                            ))
                        ) : (
                            <CartContent
                                selectedStorage={selectedStorage}
                                products={cart}
                                handleDelete={handleDelete}
                                updateQuantity={upQuantity}
                                toggleProductSelection={toggleProductSelection}
                                selectedProducts={selectedProducts}
                                selectAllProducts={selectAllProducts}
                            />
                        )}
                    </div>
                    {hasItems && (
                        <CartSummary
                            products={cart}
                            handlePayment={handleAddCard}
                            selectedProducts={selectedProducts}
                        />
                    )}
                </div>
            ) : (
                <EmptyCart />
            )}

            <GenericModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Xác nhận xóa"
                children="Bạn có muốn xóa tất sản phẩm này không?"
                footer={
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
                        >
                            Không
                        </button>
                        <button
                            onClick={handleDeleteAll}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        >
                            Có
                        </button>
                    </div>
                }
            />

            <GenericModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Xác nhận xóa"
                children="Bạn có muốn xóa sản phẩm này không?"
                footer={
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
                        >
                            Không
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        >
                            Có
                        </button>
                    </div>
                }
            />
        </div>
    );
}

export default Cart;
