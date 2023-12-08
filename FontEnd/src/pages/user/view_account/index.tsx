import Loading from '@/components/ui/Loading';
import { useMeQuery } from '@/services/auth';
import { Modal } from 'antd';
import { useState } from 'react';
import {  Outlet } from 'react-router-dom';
import UpdateAccount from '../account-detail/update-account';
import { useGetWishlistQuery } from '@/services/favourite';
import { checkAuth } from '@/utils/checkAuth';
import UploadAvatar from '../account-detail/UploadAvatar';

const View_account =()=>{
      const [openAddModal, setOpenAddModal] = useState(false);
      const handleAddCategory = () => {
            setOpenAddModal(true);
        };
        const handleModalClose = () => {
            setOpenAddModal(false);
        };
        const { data, isLoading } = checkAuth();
        const { data: authData } = useMeQuery();
        const user_id = authData?._id || '';
        const { data: wishlist } = useGetWishlistQuery(user_id);
        const wishlistItems = wishlist?.wishlist_items || [];
      return(
            <>
            {!data || isLoading ? (
                <Loading />
            ) : (
                <div>
                    <div className="pt-2">
                        <Modal
                            title="Cập nhật tài khoản "
                            centered
                            open={openAddModal}
                            onCancel={handleModalClose}
                            footer={null}
                        >
                            <UpdateAccount setOpenAddModal={setOpenAddModal} />
                        </Modal>
                        <div className="column relative z-10 justify-center flex-1 py-2 mx-auto lg:py-0">
                            <div className="col-lg-10 pb-5 my-5 rounded column">
                                <div className="list-group-item" >
                                    <div className="d-inline-block font-weight-medium text-uppercase">Trang cá nhân</div>
                                </div>
                                
                                <div className="d-flex flex-column align-items-center text-center mx-1 px-4 mb-6 h-[250px]">
                                   
                                    <div className="flex mx-2 px-2">
                                        <div className="w-[150px] h-[200px] rounded mt-3 mr-4">
                                            <img
                                                src={
                                                    authData?.avatar ||
                                                    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                                                }
                                                alt="avatar"
                                                className="rounded-circle p-1 bg-gray w-[150px] h-[200px]"
                                            />

                                        </div>
                                        <div className="mt-3 mb-3">
                                            <h4>{authData?.username}</h4>
                                            <p className="text-secondary mb-1">Khách hàng mới</p>
                                            <UploadAvatar />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Họ tên</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.username} disabled />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.email} disabled />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.phone} disabled />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.address} disabled />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-9 text-secondary">

                                                <button className="btn btn-primary" onClick={handleAddCategory} value="Cập nhật" >Cập nhật</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-10">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Họ tên</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.username} disabled />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.email} disabled />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.phone} disabled />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.address} disabled />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-9 text-secondary">

                                                <button className="btn btn-primary" onClick={handleAddCategory} value="Cập nhật" >Cập nhật</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            
                            {/* <div className="p-4 sm:ml-64">
                                                
                    </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
      )
}
export default View_account