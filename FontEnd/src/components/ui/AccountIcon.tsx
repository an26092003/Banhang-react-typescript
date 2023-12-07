import { useLogoutMutation, useMeQuery } from '@/services/auth';
import { Avatar, Button, Dropdown, MenuProps, Popover, Spin } from 'antd';
import { useEffect } from 'react';
import { AiOutlineDropbox, AiOutlineUser } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const text = <span>Tài khoản</span>;

const content = (
    <div>
        <Link to="/account/signin" className="">
            <p>Đăng nhập</p>
        </Link>
        <Link to="/account/signup" className="">
            <p>Đăng kí</p>
        </Link>
    </div>
);

const AccountIcon: React.FC = () => {
    const { data: authData,isLoading } = useMeQuery();
    const [logout, { data }] = useLogoutMutation();

    const handleLogout = async () => {
        await logout();
    };

    useEffect(() => {
        if (data === true) {
            window.location.reload();
        }
    }, [data]);

    const items: MenuProps['items'] = [
        {
            label: (
                <Link className="text-base" to={'/details'}>
                    Cá nhân
                </Link>
            ),
            key: '0',
            icon: <AiOutlineUser style={{ fontSize: '18px' }} />,
        },
        // Kiểm tra và hiển thị phần tử menu chỉ khi vai trò là editor
        authData && authData.role === 'editor'
            ? {
                label: (
                    <Link className="text-base" to={`/editor`}>
                        Editor
                    </Link>
                ),
                key: '1',
                icon: <AiOutlineDropbox style={{ fontSize: '18px' }} />,
            }
            : null,
        // Các phần tử menu khác
        // {
        //     label: (
        //         <Link className="text-base" to={`/orders/${authData?._id}`}>
        //             Hàng đã đặt
        //         </Link>
        //     ),
        //     key: '2',
        //     icon: <AiOutlineDropbox style={{ fontSize: '18px' }} />,
        // },
        {
            type: 'divider',
        },
        {
            label: (
                <Button onClick={handleLogout} className="text-base">
                    Đăng xuất
                </Button>
            ),
            key: '3',
            icon: <CiLogout style={{ fontSize: '18px' }} />,
        },
    ];
    return (
        <div className="clear-both whitespace-nowrap flex items-center">
            <div className="flex items-center">
                {authData ? (
                    <div>
                        <Dropdown menu={{ items }} trigger={['click']} arrow>
                            {isLoading && !authData ? (
                                <Spin />
                            ) : (
                                <Avatar
                                    className="cursor-pointer max-w-[38px] max-h-[38px]"
                                    size={'large'}
                                    src={authData.avatar || 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
                                />
                            )}
                        </Dropdown>
                    </div>
                ) : (
                    <Popover placement="bottom" title={text} arrow content={content} trigger="click">
                        <span className="relative inline-block text-2xl cursor-pointer max-w-[38px] max-h-[38px]">
                            <IoPersonCircleOutline className=" min-w-[38px] min-h-[38px]" />
                        </span>
                    </Popover>
                )}
            </div>
        </div>
    );
};

export default AccountIcon;
