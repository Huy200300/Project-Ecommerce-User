import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import uploadImage from '../helpers/uploadImage';
import Context from '../context';
import SummaryAip from '../common';
import { toast } from 'react-toastify';
import avatar1 from "../assets/avatar/avatar-1.png";
import avatar2 from "../assets/avatar/avatar-s-1.png";
import avatar3 from "../assets/avatar/avatar-s-2.png";
import avatar4 from "../assets/avatar/avatar-s-3.png";
import avatar5 from "../assets/avatar/avatar-s-4.png";
import avatar6 from "../assets/avatar/avatar-s-5.png";
import avatar7 from "../assets/avatar/avatar-s-6.png";
import avatar8 from "../assets/avatar/avatar-s-7.png";
import avatar9 from "../assets/avatar/avatar-s-8.png";
import avatar10 from "../assets/avatar/avatar-s-9.png";
import avatar11 from "../assets/avatar/avatar-s-10.png";
import avatar12 from "../assets/avatar/avatar-s-11.png";
import { FaTimes } from 'react-icons/fa';

const avatarList = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12];


const ProfileUser = () => {
    const { dataUser, fetchUserDetails } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState({
        name: dataUser?.name,
        email: dataUser?.email,
        phone: dataUser?.phone,
        avatar: dataUser?.avatar,
    });

    const [originalData, setOriginalData] = useState({ ...data });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUploadProduct = async (fileOrUrl) => {
        let url;

        if (typeof fileOrUrl === 'string') {
            url = fileOrUrl;
            setIsModalOpen(false);
        } else {
            const file = fileOrUrl;

            const uploadImageCloudinary = await uploadImage(file);
            url = uploadImageCloudinary.url;
        }

        setData((prev) => ({
            ...prev,
            avatar: url,
        }));
    };

    const handleUpdate = async (field) => {
        const dataResponse = await fetch(SummaryAip.update_user.url, {
            method: SummaryAip.update_user.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: dataUser?._id,
                [field]: data[field]
            })
        })
        const dataApi = await dataResponse?.json();
        if (dataApi?.success) {
            toast.success(dataApi?.message)
            fetchUserDetails();
        } else {
            if (dataApi?.error) {
                toast.error(dataApi?.message)
                setData((prev) => ({
                    ...prev,
                    [field]: originalData[field],
                }));
            }
        }
    };

    return (
        <div>
            <div className='min-h-[calc(100vh-200px)] max-w-screen-xl mx-auto flex flex-col gap-4'>
                <div className='flex relative items-center gap-5 pb-6 md:p-0 px-3'>
                    <h1 className="text-2xl font-bold uppercase w-36">Thông Tin Tài Khoản</h1>
                    <span className='font-medium'> <Link to={"/"} className='hover:text-red-500 capitalize cursor-pointer'>trang chủ</Link> / Thông Tin Tài Khoản</span>
                    <div className='absolute bottom-0 left-1/2 -ml-[50vw] right-1/2 -mr-[50vw] h-0.5 bg-slate-200 z-10'></div>
                </div>

                <div className='border-2 h-auto md:w-[800px] w-fu flex flex-col mx-auto rounded-md p-4 shadow-lg'>
                    <h1 className='flex justify-center items-center p-2 text-2xl border-b-2 border-black'>
                        Thông tin cá nhân
                    </h1>
                    {[
                        { label: 'Tên tài khoản:', name: 'name', type: 'text' },
                        { label: 'Email:', name: 'email', type: 'email' },
                        { label: 'Điện thoại:', name: 'phone', type: 'text' }
                    ]?.map((field) => (
                        <div key={field?.name} className='flex md:gap-5 gap-3 p-2 md:items-center items-start md:flex-row flex-col'>
                            <label htmlFor={field?.name} className='md:w-1/4 w-full font-medium'>{field?.label}</label>
                            <div className="flex flex-col sm:flex-row sm:gap-2 w-full">
                                <input
                                    type={field?.type}
                                    name={field?.name}
                                    value={data[field?.name]}
                                    id={field?.name}
                                    onChange={handleOnChange}
                                    className='outline-none bg-gray-100 border border-gray-300 rounded-md p-2 w-full'
                                />
                                <button
                                    onClick={() => handleUpdate(field?.name)}
                                    className='px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition'
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex md:gap-0 gap-2 flex-row justify-between md:p-2 p-3 items-center">
                        <div className="flex md:gap-16 gap-1 items-center">
                            <label htmlFor="avatar" className="w-1/4 font-medium">
                                Avatar:
                            </label>
                            <div className="flex gap-3">
                                <button
                                    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Chọn từ thư mục
                                </button>
                                <label htmlFor="avatar" className="cursor-pointer">
                                    <div className="px-4 py-2 text-center rounded-md bg-gray-200 hover:bg-gray-300 transition">
                                        Tải lên từ thiết bị
                                    </div>
                                    <input
                                        type="file"
                                        name="avatar"
                                        id="avatar"
                                        className="hidden"
                                        onChange={(e) => handleUploadProduct(e.target.files[0])}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='flex md:gap-16 gap-5'>
                            <div className="text-3xl flex items-center">
                                {data?.avatar && (
                                    <img
                                        src={data?.avatar}
                                        alt={data?.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                )}
                            </div>
                            <button
                                onClick={() => handleUpdate('avatar')}
                                className="md:px-2 px-1.5 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                            >
                                Cập nhật
                            </button>
                        </div>



                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white rounded-md w-96 p-5 relative">
                                    <div className='flex justify-between items-center mb-4'>
                                        <h3 className="text-lg font-bold">Chọn Avatar</h3>
                                        <button
                                            className=" hover:text-red-500 text-lg font-bold"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {avatarList.map((url, index) => (
                                            <div
                                                key={index}
                                                className="relative group cursor-pointer w-20 h-20 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition"
                                                onClick={() => handleUploadProduct(url)}
                                            >
                                                <img
                                                    src={url}
                                                    alt={`Avatar ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                                    <span className="text-white font-medium">Chọn</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
