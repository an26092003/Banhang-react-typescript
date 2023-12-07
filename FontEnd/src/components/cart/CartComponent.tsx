import { decrease, increase, remove } from '@/slices/cart';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { formartVND } from '@/utils/formartVND';
import { CloseOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

const CartComponent = () => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    return (
        <div>
            <table className="font-medium lg:block md:block hidden table-auto">
                <thead className="text-base">
                    <tr className="border-b">
                        <th></th>
                        <th></th>
                        <th className="px-4 text-left uppercase font-semibold text-nav py-4">Sản phẩm</th>
                        <th className="px-2 uppercase font-semibold text-nav py-4">Giá</th>
                        <th className="px-2 uppercase font-semibold text-nav py-4">Số</th>
                        <th className="uppercase font-semibold text-nav py-4">Tổng</th>
                    </tr>
                </thead>
                <tbody className="border-b-2 border-gray-300">
                    {cartItems.map((item, index) => {
                        return (
                            <tr key={index} className="text-sm">
                                <th>
                                    <button className="p-3" onClick={() => dispatch(remove(index))}>
                                        <CloseOutlined />
                                    </button>
                                </th>
                                <th>
                                    <img
                                        className="lg:min-w-[80px] md:min-w-[65px] lg:min-h-[80px] w-[65px] h-[65px]"
                                        src={`${item.images![0]}`}
                                        alt=""
                                    />
                                </th>
                                <th className="px-4 w-full py-8 text-left">
                                    {item?.size?.length || item?.color?.length > 0 ? (
                                        <Link to={`/detail/${item._id}`}>
                                            {item.name.slice(0, 10)}... - {item.size} - {item.color}
                                        </Link>
                                    ) : (
                                        <Link to={`/detail/${item._id}`}>{item.name.slice(0, 10)}...</Link>
                                    )}
                                </th>
                                <th className="px-2 py-8">{formartVND(item.price)}</th>
                                <th className="px-2 py-8">
                                    <div className="min-w-[80px] max-w-[80px] flex">
                                        <button
                                            className="border border-b px-2 py-2"
                                            onClick={() => dispatch(decrease(index))}
                                        >
                                            -
                                        </button>
                                        <span className="flex items-center px-2 border-t border-b">
                                            {item.quantity}
                                        </span>
                                        <button className="border px-2 py-2" onClick={() => dispatch(increase(index))}>
                                            +
                                        </button>
                                    </div>
                                </th>
                                <th className="px-2 py-8">
                                    <p className="!text-primary text-base">{formartVND(item.price * item.quantity)}</p>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {cartItems.map((item, index) => (
                <div key={index} className="lg:hidden md:hidden flex font-medium gap-x-3">
                    <img className="col-span-1 max-w-[100px] max-h-[100px]" src={`${item.images![0]}`} alt="" />
                    <div className="col-span-2 flex flex-col justify-between flex-1 text-sm">
                        <div className="flex justify-between items-center">
                            <span>
                                {item.name} {item?.size && `- ${item?.size}`} {item?.color && `- ${item?.color}`}
                            </span>
                            <button className="p-3" onClick={() => dispatch(remove(index))}>
                                <CloseOutlined />
                            </button>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 py-2">
                            <span>Giá</span>
                            <span className="">{formartVND(item.price)}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 py-2">
                            <span>Số lượng</span>
                            <div>
                                <div className="min-w-[80px] max-w-[80px] flex">
                                    <button
                                        className="border border-b px-2 py-2"
                                        onClick={() => dispatch(decrease(index))}
                                    >
                                        -
                                    </button>
                                    <span className="flex items-center px-2 border-t border-b">{item.quantity}</span>
                                    <button className="border px-2 py-2" onClick={() => dispatch(increase(index))}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span>Tổng giá</span>
                            <span className="!text-primary">{formartVND(item.quantity * item.price)}</span>
                        </div>
                        <Divider />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartComponent;
