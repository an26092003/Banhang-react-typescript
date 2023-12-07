import CartComponent from '@/components/cart/CartComponent';
import Loading from '@/components/ui/Loading';
import { useAppSelector } from '@/store/hook';
import { formartVND } from '@/utils/formartVND';
import { reduceTotal } from '@/utils/reduce';
import { Alert } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface CartProps { }

const Cart: FunctionComponent<CartProps> = () => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [cartItems]);

    return (
        <>
            {loading ? (
                <div className="min-h-screen">
                    <Loading />
                </div>
            ) : (
                <div className="max-w-full w-layout mx-auto">
                    <div className="grid lg:grid-cols-3 grid-cols-1 py-10 lg:px-0 lg:pr-2">
                        {!cartItems || cartItems.length === 0 ? (
                            <div className="items-center flex-col w-full justify-center col-span-3 flex">
                                <div>
                                    <img src="/nahida.webp" className="w-layout max-w-full mx-auto" alt="" />
                                </div>
                                <div>
                                    <Alert
                                        message="Giỏ hàng của bạn đang trống"
                                        description="Rất vui khi quý khách mua hàng của chúng tôi"
                                        type="info"
                                        showIcon
                                    />
                                    <Link
                                        to={'/'}
                                        className="w-full block text-center py-4 px-2 uppercase !bg-primary hover:bg-secondary !text-white mt-2 font-semibold"
                                    >
                                        Quay lại trang chủ
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="col-span-2 p-4 text-nav">
                                    <CartComponent />

                                    {/* Apply Coupon */}
                                    <br />
                                    <div className="lg:flex md:flex space-y-4 lg:space-y-0 block flex-row-reverse justify-between items-center">
                                        <button className="bg-gray-200 opacity-80 hover:opacity-100 transition-all shadow text-sub px-3 py-2 uppercase">
                                            Cập nhật giỏ hàng
                                        </button>
                                        <div className="border-dashed border lg:border-0 md:border-0 p-6 flex border-gray-300">
                                            <input
                                                type="text"
                                                className="border w-2/3 lg:w-auto md:w-auto outline-none px-2 py-2"
                                                placeholder="Mã giảm giá"
                                            />
                                            <button className="ml-2 font-semibold !bg-primary w-1/3 lg:w-auto md:w-auto px-2 py-2 text-white">
                                                ÁP MÃ GIẢM GIÁ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 px-4 lg:px-0">
                                    <div className="border-2 border-gray-200 rounded space-y-6 p-5 font-semibold text-sm text-nav">
                                        <h1 className="uppercase text-xl">TỔNG GIỎ HÀNG</h1>

                                        <div className="flex flex-col justify-between gap-y-6">
                                            <div className="flex justify-between items-center border-b border-gray-200 py-3">
                                                <span>Tổng phụ</span>
                                                <span>{formartVND(reduceTotal(cartItems))}</span>
                                            </div>

                                            <div className="flex justify-between items-center text-xl py-2">
                                                <p>Tổng</p>
                                                <p className="!text-primary">
                                                    {formartVND(reduceTotal(cartItems))}
                                                </p>
                                            </div>

                                            <a
                                                href="/checkout"
                                                className="block text-white text-center !bg-primary py-2"
                                            >
                                                TIẾN HÀNH KIỂM TRA
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
