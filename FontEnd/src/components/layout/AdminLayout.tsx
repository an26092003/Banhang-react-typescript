import { checkAdmin } from '@/utils/checkAdmin';
import { Outlet, Link } from 'react-router-dom';
import Loading from '../ui/Loading';
import { Dropdown, MenuProps } from 'antd';
import { useLogoutMutation } from '@/services/auth';
import { useState } from 'react';


import { AppstoreAddOutlined, AppstoreOutlined, FireOutlined } from '@ant-design/icons';




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
                                        <span className="sr-only">Open sidebar</span>
                                        <svg
                                            className="w-6 h-6"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                            ></path>
                                        </svg>
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
                                        <div
                                            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                            id="dropdown-user"
                                        >
                                            <div className="px-4 py-3" role="none">
                                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                    Neil Sims
                                                </p>
                                                <p
                                                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                                    role="none"
                                                >
                                                    neil.sims@flowbite.com
                                                </p>
                                            </div>
                                            <ul className="py-1" role="none">
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        role="menuitem"
                                                    >
                                                        Dashboard
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        role="menuitem"
                                                    >
                                                        Settings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        role="menuitem"
                                                    >
                                                        Earnings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        role="menuitem"
                                                    >
                                                        Sign out
                                                    </a>
                                                </li>
                                            </ul>
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
                                        <svg
                                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 21"
                                        >
                                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                        </svg>
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
                                         <AppstoreOutlined style={{ fontSize: '22px', }} />
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
                                                    <AppstoreAddOutlined style={{ fontSize: '18px', }} />
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
                                        <svg
                                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 18"
                                        >
                                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                        </svg>
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
                                        <svg
                                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 18 18"
                                        >
                                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                        </svg>
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
                                                    <svg
                                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 18 20"
                                                    >
                                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                                    </svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Quản lý sản phẩm</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="color" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0" fill="#f4f4f4" stroke="#4b4b4d" stroke-width="2" />
                                                        <circle cx="7" cy="7" r="1.5" fill="#ff0000" />
                                                        <circle cx="11" cy="5" r="1.5" fill="#00ff00" />
                                                        <circle cx="15" cy="7" r="1.5" fill="#0000ff" />
                                                        <circle cx="16" cy="11" r="1.5" fill="#ffff00" />
                                                        <circle cx="11" cy="14" r="1.5" fill="#00ffff" />
                                                        <circle cx="6" cy="11" r="1.5" fill="#ff00ff" />
                                                    </svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Quản lý màu sắc</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="size" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                        aria-hidden="true"
                                                    >
                                                        <rect x="3" y="5" width="18" height="2" fill="#000000" />
                                                        <rect x="3" y="11" width="12" height="2" fill="#000000" />
                                                        <rect x="3" y="17" width="6" height="2" fill="#000000" />
                                                    </svg>


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
                                        <svg
                                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 18 21"
                                        >
                                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                        </svg>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Đơn hàng</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="sale"
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                        <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 13 6-6m-5-.5h.01m2.98 7H11m1.007-11.313a2.75 2.75 0 0 0 2.1.87 2.745 2.745 0 0 1 2.837 2.837 2.749 2.749 0 0 0 .87 2.1 2.747 2.747 0 0 1 0 4.014 2.748 2.748 0 0 0-.87 2.1 2.746 2.746 0 0 1-2.837 2.837 2.75 2.75 0 0 0-2.1.87 2.748 2.748 0 0 1-4.014 0 2.75 2.75 0 0 0-2.1-.87 2.744 2.744 0 0 1-2.837-2.837 2.749 2.749 0 0 0-.87-2.1 2.747 2.747 0 0 1 0-4.014 2.75 2.75 0 0 0 .87-2.1 2.745 2.745 0 0 1 2.838-2.837 2.749 2.749 0 0 0 2.1-.87 2.748 2.748 0 0 1 4.013 0Z" />
                                        </svg>

                                        <span className="flex-1 ml-3 whitespace-nowrap">Sale</span>
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
