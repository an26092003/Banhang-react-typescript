import { checkAdmin } from '@/utils/checkAdmin';
import { Outlet, Link } from 'react-router-dom';
import Loading from '../ui/Loading';
import { Dropdown, MenuProps } from 'antd';
import { useLogoutMutation } from '@/services/auth';
import { useState } from 'react';
import { IoIosColorPalette } from "react-icons/io";
import { GiResize } from "react-icons/gi";
import {  FireOutlined } from '@ant-design/icons';
import { AiOutlineMenu } from 'react-icons/ai';
import AdminMobileMenu from '../modal/AdminMobileMenu';
import { BiSolidCategory } from "react-icons/bi";
import { MdCategory,MdSupervisorAccount,MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { RiShirtFill,RiDashboard3Fill } from "react-icons/ri";
import { LiaSalesforce } from "react-icons/lia";

const AdminLayout = () => {
    const { data: authData, isLoading } = checkAdmin();
    const [logout, { }] = useLogoutMutation();

    const handleLogout = () => {
        logout().then(() => window.location.reload());
    };


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <button onClick={handleLogout}>Đăng xuất</button>,
        },
    ];

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const [isOpenOne, setIsOpenOne] = useState(false);

    const toggleMenuOne = () => {
        setIsOpenOne(!isOpenOne);
    };


    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
 
    return (
        <>
            {isLoading || (!isLoading && authData?.role !== 'admin') ? (
                <Loading />
            ) : (
                <div>
                    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <div className="px-3 py-3 lg:px-5 lg:pl-3">
                            <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start">
                                    <button
                                        data-drawer-target="logo-sidebar"
                                        data-drawer-toggle="logo-sidebar"
                                        aria-controls="logo-sidebar"
                                        type="button"
                                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                    >
                                        <button
                                            onClick={showDrawer}
                                            className="flex items-center px-3 py-2 text-primary border border-primary rounded hover:text-primary hover:border-blue-300 lg:hidden"
                                        >
                                            <AiOutlineMenu />
                                        </button>
                                        
                                    </button>
                                    <a href="" className="flex ml-2 md:mr-24">
                                            <img
                                                src="../logo.svg"
                                                className="h-8 mr-3"
                                                alt="FlowBite Logo"
                                            />
                                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">

                                            </span>
                                        </a>
                                        <AdminMobileMenu open={open} onClose={onClose} />
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center ml-3">
                                        <div>
                                            <Dropdown
                                                arrow
                                                trigger={['click']}
                                                placement="bottomRight"
                                                menu={{ items }}
                                            >
                                                <button
                                                    type="button"
                                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                                    aria-expanded="false"
                                                    data-dropdown-toggle="dropdown-user"
                                                >
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src={
                                                            authData?.avatar ||
                                                            'https://cdn-icons-png.flaticon.com/512/2206/2206368.png'
                                                        }
                                                        alt="user photo"
                                                    />
                                                </button>
                                            </Dropdown>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <aside
                        id="logo-sidebar"
                        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                        aria-label="Sidebar"
                    >
                        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link
                                        to="/admin"
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                        <RiDashboard3Fill style={{ fontSize: '18px', }}/>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Bảng điều khiển</span>
                                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                            Pro
                                        </span>
                                    </Link>
                                </li>
                                
                                <li>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        aria-controls="dropdown-example"
                                        data-collapse-toggle="dropdown-example"
                                        onClick={toggleMenuOne}
                                    >
                                        <BiSolidCategory style={{ fontSize: '18px', }}/>
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Danh mục</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>
                                    {isOpenOne && (
                                        <ul id="dropdown-example" className="py-2 space-y-2">
                                            <li>
                                                <Link
                                                    to="category"
                                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                >
                                                    <MdCategory  style={{ fontSize: '18px', }} />
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Quản lý Danh mục</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="brand" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                                    <FireOutlined style={{ fontSize: '18px', }} />
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Quản lý Thương hiệu</span>
                                                </Link>
                                            </li>
                                           
                                        </ul>
                                    )}
                                </li>

                                <li>
                                    <Link
                                        to="user"
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                        <MdSupervisorAccount style={{ fontSize: '18px', }}/>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Tài khoản</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        aria-controls="dropdown-example"
                                        data-collapse-toggle="dropdown-example"
                                        onClick={toggleMenu}
                                    >
                                        <MdDashboard style={{ fontSize: '18px', }}/>
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Sản phẩm</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>
                                    {isOpen && (
                                        <ul id="dropdown-example" className="py-2 space-y-2">
                                            <li>
                                                <Link
                                                    to="product"
                                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                >
                                                    <RiShirtFill style={{ fontSize: '18px', }}/>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Quản lý sản phẩm</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="color" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                                    <IoIosColorPalette style={{ fontSize: '18px', }} />
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Quản lý màu sắc</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="size" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                    <GiResize style={{ fontSize: '18px', }}/>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Quản lý kích cỡ</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <Link
                                        to="order"
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                       <MdOutlineProductionQuantityLimits style={{ fontSize: '18px', }}/>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Đơn hàng</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="sale"
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                        <LiaSalesforce style={{ fontSize: '18px', }}/>

                                        <span className="flex-1 ml-3 whitespace-nowrap">Giảm giá</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside >

                    <div className="p-4 sm:ml-64">
                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                            <Outlet />
                        </div>
                    </div>
                </div >
            )}
        </>
    );
};

export default AdminLayout;