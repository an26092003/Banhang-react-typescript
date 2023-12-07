import { Drawer, Menu } from 'antd';
import { FunctionComponent, Key, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import type { MenuProps } from 'antd';

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
        link: '/editor/category'
    },
    {
        _id: 'danhmuc2',
        title: 'Quản lý thương hiệu',
        link: '/editor/brand'
    }
]



const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const EditorMobileMenu: FunctionComponent<MobileModalProps> = ({ open, onClose, }) => {

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const items: MenuItem[] = [
        getItem('Danh mục', 'sub4', <BiSolidCategoryAlt />, danhmuc.map((danhmuc) => (
            getItem(<Link onClick={onClose} to={danhmuc.link}>{danhmuc.title}</Link>, danhmuc._id)
        ))),
        getItem('Sản phẩm','sub5', <BiSolidCategoryAlt />, [
            getItem(<Link onClick={onClose} to={'/editor/product'}>Quản lý sản phẩm</Link>, 'product'),
            getItem(<Link onClick={onClose} to={'/editor/color'}>Quản lý màu sắc</Link>, 'color'),
            getItem(<Link onClick={onClose} to={'/editor/size'}>Quản lý kích thước</Link>, 'size'),
        ]),

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

export default EditorMobileMenu;