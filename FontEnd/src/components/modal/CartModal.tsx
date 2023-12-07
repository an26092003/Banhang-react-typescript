import { FunctionComponent, useState } from 'react';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { reduceTotal } from '@/utils/reduce';
import { remove } from '@/slices/cart';
import { formartVND } from '@/utils/formartVND';

interface CartModalProps {}

const CartModal: FunctionComponent<CartModalProps> = () => {
    const { cartItems } = useAppSelector((state) => state.cart);

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [placement, _setPlacement] = useState<DrawerProps['placement']>('right');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="flex mr-5 cursor-pointer">
            <div className="text-2xl relative">
                <BsCart2 type="primary" onClick={showDrawer} />
                <span className="!bg-primary text-white w-5 h-5 flex justify-center items-center rounded-full absolute -top-2 -right-2 text-sm">
                    {cartItems?.length}
                </span>
            </div>
            <Drawer
                title="Shopping cart"
                placement={placement}
                closable={true}
                onClose={onClose}
                open={open}
                key={placement}
                style={{ zIndex: 99999, position: 'relative' }}
            >
                <div className="flex-1 overflow-y-auto px-0 py-4 sm:px-6">
                    <div className="mt-0">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cartItems.length === 0 ? (
                                    <h1 className="text-center text-base">
                                        Bạn chưa thêm sản phẩm nào vài giỏ hàng 😥
                                    </h1>
                                ) : (
                                    cartItems.map((item, index) => (
                                        <li key={index} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item?.images[0]}
                                                    alt={item?.name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3 className="line-clamp-3">
                                                            <Link to={`/detail/${item._id}`}>{item?.name}</Link>
                                                        </h3>
                                                        <p className="ml-4">{formartVND(item?.price)}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item?.categoryId?.name}
                                                    </p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Số lượng:{item?.quantity}</p>

                                                    <div className="flex">
                                                        <button
                                                            onClick={() => dispatch(remove(index))}
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-0 py-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Tổng phụ</p>
                        <p>{formartVND(reduceTotal(cartItems))}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Vận chuyển và thuế được tính khi thanh toán.</p>
                    <div className="mt-6">
                        <Link
                            to={'/cart'}
                            onClick={onClose}
                            className="flex items-center justify-center border border-transparent !bg-primary px-6 py-2 text-base font-medium text-white shadow-sm hover:!bg-primary/90"
                        >
                            Xem giỏ hàng
                        </Link>
                        <Link
                            to={'/checkout'}
                            onClick={onClose}
                            className="flex items-center mt-2 justify-center border border-transparent !bg-primary px-6 py-2 text-base font-medium text-white shadow-sm hover:!bg-primary/90"
                        >
                           Thanh toán
                        </Link>

                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            hoặc
                            <button type="button" onClick={() => setOpen(false)} className="font-medium !text-primary">
                                Tiếp mục mua hàng
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </p>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default CartModal;
