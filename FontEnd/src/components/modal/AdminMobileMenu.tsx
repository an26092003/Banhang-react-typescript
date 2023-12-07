import { Drawer, Menu } from 'antd';
import { FunctionComponent, Key, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { RiDashboard3Fill } from "react-icons/ri";
import type { MenuProps } from 'antd';
import { MdOutlineProductionQuantityLimits, MdSupervisorAccount } from 'react-icons/md';
import { LiaSalesforce } from "react-icons/lia";

type MenuItem = Required<MenuProps>['items'][number];
interface MobileModalProps {
    open: boolean;
    onClose: () => void;

}

function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const danhmuc = [
    {
        _id: 'danhmuc1',
        title: 'Quản lý danh mục',
        link: '/admin/category'
    },
    {
        _id: 'danhmuc2',
        title: 'Quản lý thương hiệu',
        link: '/admin/brand'
    }
]



const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const AdminMobileMenu: FunctionComponent<MobileModalProps> = ({ open, onClose }) => {

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const items: MenuItem[] = [
        getItem(<Link onClick={onClose} to={'/'}>Bảng điều khiển</Link>, 'sub4', <RiDashboard3Fill />),
        getItem('Danh mục', 'sub4', <BiSolidCategoryAlt />, danhmuc.map((danhmuc) => (
            getItem(<Link onClick={onClose} to={danhmuc.link}>{danhmuc.title}</Link>, danhmuc._id)
        ))),
        getItem(<Link onClick={onClose} to={'/admin/user'}>Tài khoản</Link>, 'account', <MdSupervisorAccount />),
        getItem('Sản phẩm','sub5', <BiSolidCategoryAlt />, [
            getItem(<Link onClick={onClose} to={'/admin/product'}>Quản lý sản phẩm</Link>, 'product'),
            getItem(<Link onClick={onClose} to={'/admin/color'}>Quản lý màu sắc</Link>, 'color'),
            getItem(<Link onClick={onClose} to={'/admin/size'}>Quản lý kích thước</Link>, 'size'),
        ]),
        getItem(<Link onClick={onClose} to={'/admin/order'}>Đơn hàng</Link>, 'order', <MdOutlineProductionQuantityLimits />),
        getItem(<Link onClick={onClose} to={'/admin/sale'}>Giảm giá</Link>, 'sale', <LiaSalesforce />),

    ];

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Drawer title="Menu" placement="left" onClose={onClose} open={open}>
            <Menu className='w-full' mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} items={items} />
        </Drawer>
    );
};

export default AdminMobileMenu;