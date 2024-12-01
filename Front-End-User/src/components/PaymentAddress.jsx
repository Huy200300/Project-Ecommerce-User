import React, { useState } from 'react'
import GenericModal from './GenericModal'
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import ShippingMethod from './ShippingMethod';
import UpdateInfoModal from './UpdateInfoModal';
import useAddressSelection from '../helpers/useAddressSelection';

const PaymentAddress = ({ dataShipping, shippingOrClause, handleChange, handleUpdateInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [shippingMethod, setShippingMethod] = useState('FAST');
    const [shippingFee, setShippingFee] = useState(20000);
    const [data, setData] = useState({
        fullName: "",
        addressType: "",
        phone: "",
        defaultAddress: false,
        detailAddress: "",
        fullAddress: ""
    });
    const {
        selectedCity,
        selectedDistrict,
        selectedWard,
        selectedTab,
        setSelectedTab,
        cities,
        districtsByCity,
        wardsByDistrict,
        dropdownVisible,
        setDropdownVisible,
        handleCitySelect,
        handleDistrictSelect,
        handleWardSelect
    } = useAddressSelection();

    const [selectedAddress, setSelectedAddress] = useState(() => {
        if (!dataShipping || dataShipping?.length === 0) {
            return null;
        }
        const defaultAddr = dataShipping.find(address => address.defaultAddress);

        return defaultAddr || dataShipping[0];
    });
    const handleSelectAddress = (id) => {
        const address = dataShipping?.find(address => address._id === id);
        setSelectedAddress(address);
        setIsModalOpen(false);
    };
    const handleShippingMethodChange = (method) => {
        setShippingMethod(method);
        if (method === 'FAST') {
            setShippingFee(20000);
        } else if (method === 'GO_JEK') {
            setShippingFee(25000);
        }
    };
    const handleOnChange = (event) => {
        const { name, value, checked, type } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-4 uppercase">Địa chỉ giao hàng</h2>
            {dataShipping?.length > 0 ? (
                <>
                    {selectedAddress && (
                        <div className="p-4 bg-blue-100 border rounded-md mt-4 cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <div className='flex items-center justify-between'>
                                <h3 className="text-lg font-bold mb-2">Địa chỉ đã chọn:</h3>
                                <p className='text-lg font-bold flex capitalize items-center gap-2'>Thay đổi <IoIosArrowDroprightCircle /></p>
                            </div>
                            <p className='font-medium'><span className='font-bold text-lg'>Họ tên:</span> {selectedAddress.fullName}</p>
                            <p className='font-medium'><span className='font-bold text-lg'>Địa chỉ:</span> {selectedAddress.fullAddress}</p>
                            <p className='font-medium'><span className='font-bold text-lg'>Địa chỉ cụ thể:</span> {selectedAddress.detailAddress}</p>
                            <p className='font-medium'><span className='font-bold text-lg'>Giao tới:</span> {selectedAddress.addressType}</p>
                            <p className='font-medium'><span className='font-bold text-lg'>Số điện thoại:</span> {selectedAddress.phone}</p>
                        </div>
                    )}

                    <GenericModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Chọn địa chỉ giao hàng"
                        classNameCus="h-5/6"
                        children={
                            <div className='overflow-y-auto'>
                                {dataShipping?.map(address => (
                                    <div key={address._id} className="p-4 bg-gray-100 border rounded-md mb-4 cursor-pointer">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="selectedAddress"
                                                value={address._id}
                                                checked={selectedAddress?._id === address._id}
                                                onChange={() => handleSelectAddress(address._id)}
                                                className="form-radio h-5 w-5 accent-red-500"
                                            />
                                            <div className="ml-4">
                                                <p className='font-semibold'>Họ tên: {address.fullName}</p>
                                                <p className='font-semibold'>Địa chỉ: {address.fullAddress}</p>
                                                <p className='font-semibold'>Địa chỉ cụ thể: {address.detailAddress}</p>
                                                <p className='font-semibold'>Giao tới: {address.addressType}</p>
                                                <p className='font-semibold'>Số điện thoại: {address.phone}</p>
                                                <p className='font-bold text-red-500 uppercase'>{address?.defaultAddress ? "mặc định" : ""}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                                <div className="mt-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="shippingAddress"
                                            value={shippingOrClause.shipping}
                                            checked={isOpenModalUpdateInfo}
                                            onChange={handleChange}
                                            className="form-checkbox h-4 w-4"
                                        />
                                        <span className="ml-2 font-bold">Gửi đến một địa chỉ khác?</span>
                                    </label>
                                </div>
                            </div>
                        }
                        footer={
                            <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                Đóng
                            </button>
                        }
                    />
                    <div className="">
                        <ShippingMethod
                            shippingMethod={shippingMethod}
                            handleShippingMethodChange={handleShippingMethodChange}
                        />
                    </div>
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpenModalUpdateInfo
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                            }`}
                    >
                        {isOpenModalUpdateInfo && (
                            <UpdateInfoModal
                                data={data}
                                handleOnChange={handleOnChange}
                                handleUpdateInfo={handleUpdateInfo}
                                setIsOpenModalUpdateInfo={setIsOpenModalUpdateInfo}
                            />
                        )}
                    </div>
                </>
            ) : (
                <form
                    onSubmit={(e) => handleUpdateInfo(e)}
                    className="p-4 border rounded-md">
                    <h2 className="text-xl text-center uppercase font-bold mb-4">Nhập thông tin địa chỉ</h2>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Họ tên:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={data.fullName || ''}
                            onChange={handleInputChange}
                            className="w-full font-semibold p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block font-bold mb-2">Địa chỉ</label>
                        <div className="relative">
                            <input
                                type="text"
                                name='fullAddress'
                                value={`${selectedWard} ${selectedDistrict} ${selectedCity}  `}
                                readOnly
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                                className="w-full font-semibold p-2 border rounded cursor-pointer"
                                required
                            />
                        </div>
                        {dropdownVisible && (
                            <div className="absolute z-10 bg-white border w-full mt-2 rounded-md">
                                <div className="flex">
                                    <button
                                        type="button"
                                        className={`w-1/3 font-semibold p-2 border-b-2 text-center ${selectedTab === 'city' ? 'text-red-500 border-red-500' : ''}`}
                                        onClick={() => setSelectedTab('city')}
                                    >
                                        Tỉnh/Thành phố
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-1/3 font-semibold p-2 border-b-2 text-center ${selectedTab === 'district' ? 'text-red-500 border-red-500' : ''}`}
                                        onClick={() => setSelectedTab('district')}
                                        disabled={!selectedCity}
                                    >
                                        Quận/Huyện
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-1/3 font-semibold p-2 border-b-2 text-center ${selectedTab === 'ward' ? 'text-red-500 border-red-500' : ''}`}
                                        onClick={() => setSelectedTab('ward')}
                                        disabled={!selectedDistrict}
                                    >
                                        Phường/Xã
                                    </button>
                                </div>
                                <div className="max-h-48 overflow-y-auto">
                                    {selectedTab === 'city' && cities.map(city => (
                                        <div key={city} className="p-2 font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleCitySelect(city)}>
                                            {city}
                                        </div>
                                    ))}
                                    {selectedTab === 'district' && districtsByCity[selectedCity]?.map(district => (
                                        <div key={district} className="p-2 font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleDistrictSelect(district)}>
                                            {district}
                                        </div>
                                    ))}
                                    {selectedTab === 'ward' && wardsByDistrict[selectedDistrict]?.map(ward => (
                                        <div key={ward} className="p-2 font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleWardSelect(ward)}>
                                            {ward}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Địa chỉ cụ thể:</label>
                        <input
                            type="text"
                            name="detailAddress"
                            value={data.detailAddress || ''}
                            onChange={handleInputChange}
                            className="w-full font-semibold p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Giao tới:</label>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                className={`py-2 px-4 border font-semibold rounded ${data?.addressType === 'Nhà Riêng' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
                                onClick={() => handleOnChange({ target: { name: 'addressType', value: 'Nhà Riêng' } })}
                            >
                                Nhà Riêng
                            </button>
                            <button
                                type="button"
                                className={`py-2 px-4 border font-semibold rounded ${data?.addressType === 'Văn Phòng' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
                                onClick={() => handleOnChange({ target: { name: 'addressType', value: 'Văn Phòng' } })}
                            >
                                Văn Phòng
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            value={data.phone || ''}
                            onChange={handleInputChange}
                            className="w-full font-semibold p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex justify-start items-center mb-4">
                        <label className="flex items-center font-bold">
                            <input
                                type="checkbox"
                                name='defaultAddress'
                                checked={data?.defaultAddress}
                                onChange={handleOnChange}
                                className="mr-2 accent-red-500"
                            />
                            Đặt làm địa chỉ mặc định
                        </label>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button
                            type="submit"
                            className="bg-orange-500  text-white px-4 py-2 rounded font-bold uppercase hover:bg-orange-700"
                        >
                            Hoàn thành
                        </button>
                    </div>
                </form>
            )}
        </>
    )
}

export default PaymentAddress