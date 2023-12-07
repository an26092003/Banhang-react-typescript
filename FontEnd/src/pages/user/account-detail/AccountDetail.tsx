import Breadcrumbs from '@/components/breadcrumbs';
import Loading from '@/components/ui/Loading';
import { useMeQuery } from '@/services/auth';
// import { Modal } from 'antd';
// import { useState } from 'react';
import {  Outlet } from 'react-router-dom';
// import UpdateAccount from './update-account';
import { useGetWishlistQuery } from '@/services/favourite';
import { checkAuth } from '@/utils/checkAuth';
// import UploadAvatar from './UploadAvatar';
import './style.css'
// import OrderSumeries from '../orders/OrderSumeries';
// import ListYourFavourite from '@/components/products/list-favourite';

const AccountDetail: React.FC = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [openAddModal, setOpenAddModal] = useState(false);

    // const handleAddCategory = () => {
    //     setOpenAddModal(true);
    // };
    // const handleModalClose = () => {
    //     setOpenAddModal(false);
    // };
    const { data, isLoading } = checkAuth();
    const { data: authData } = useMeQuery();
    const user_id = authData?._id || '';
    const { data: wishlist } = useGetWishlistQuery(user_id);
    const wishlistItems = wishlist?.wishlist_items || [];
    return (
        <>
            {!data || isLoading ? (
                <Loading />
            ) : (
                <div className='flex top-0 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 '>
                    <aside className=''>
                            <Breadcrumbs />
                    </aside>
                    <div className="">
                        {/* <Modal
                            title="Cập nhật tài khoản "
                            centered
                            open={openAddModal}
                            onCancel={handleModalClose}
                            footer={null}
                        >
                            <UpdateAccount setOpenAddModal={setOpenAddModal} />
                        </Modal> */}
                        <div className="">
                            <div className="">
                                <div className="">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default AccountDetail;
