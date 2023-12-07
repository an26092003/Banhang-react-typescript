import { Collapse, Steps, Tag, theme } from 'antd';
import { MdKeyboardArrowRight, MdSmsFailed } from 'react-icons/md';
import { useGetsOrderQuery } from '@/services/order';
import { Status } from '@/types/status';
import Loading from '@/components/ui/Loading';
import { FaShippingFast } from 'react-icons/fa';
import { BsPersonVcardFill, BsDropbox, BsCheckCircleFill } from 'react-icons/bs';
import { checkAuth } from '@/utils/checkAuth';
import { formatTimeToNow } from '@/utils/formartDate';

import { useState } from 'react';
import { Button } from 'antd/es/radio';
import { Link } from 'react-router-dom';
import Modal from 'antd/es/modal/Modal';
import Hoandon from './Hoandon';

const { Panel } = Collapse;

type Props = {};

const OrderSumeries = ({}: Props) => {
    const { data: orders, isLoading } = useGetsOrderQuery();
    const { data: authdata } = checkAuth();

    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);

    const onShow = () => {
        setOpen(true);
    };

    const renderPayMethod = (method: number, status?: number, isPaid?: boolean) => {
        if (status === Status.CANCELLED) {
            return (
                <Tag color="red-inverse" style={{ padding: 4 }}>
                    Đã hủy
                </Tag>
            );
        } else {
            if (isPaid === false) {
                return (
                    <Tag color="red-inverse" style={{ padding: 4 }}>
                        Thanh toán thất bại
                    </Tag>
                );
            }

            if (method === 0)
                return (
                    <Tag color="orange-inverse" style={{ padding: 4 }}>
                        Thanh toán khi nhận hàng
                    </Tag>
                );
            if (method === 1)
                return (
                    <Tag color="green-inverse" style={{ padding: 4 }}>
                        Đã thanh toán
                    </Tag>
                );
        }
    };

    const filterOrders = orders?.docs?.filter((order) => order.userId === authdata?._id && order.isPaid === true);

    return (
        <div className="min-h-screen">
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    {!filterOrders || filterOrders?.length === 0 ? (
                        <div className="flex items-center flex-col justify-center gap-y-2">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
                                className="w-[360px] h-[360px] opacity-25"
                                alt=""
                            />

                            <h1 className="mt-10 text-xl font-semibold">Giỏ hàng của bạn hiện đang trống.</h1>
                            <p className="max-w-[960px] text-center">
                                Trước khi tiến hành thanh toán, bạn phải thêm một số sản phẩm vào giỏ hàng của mình. Bạn
                                sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.
                            </p>

                            <a href="/" className="uppercase bg-primary/90 text-white text-center px-4 py-2">
                                Trở lại cửa hàng
                            </a>
                        </div>
                    ) : (
                        <div className="min-h-screen py-10 max-w-5xl mx-auto px-3">
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={filterOrders![0]._id}
                                    expandIcon={({ isActive }) => <MdKeyboardArrowRight rotate={isActive ? 90 : 0} />}
                                    style={{ background: token.colorBgContainer }}
                                >
                                    {filterOrders?.map((order) => {
                                        return (
                                            <Panel
                                                header={
                                                    <div>
                                                        Đơn hàng của {order.fullName} - Đặt hàng vào lúc :
                                                        {formatTimeToNow(new Date(order?.createdAt))}
                                                        <span className="ml-4">
                                                            {renderPayMethod(
                                                                order.payMethod,
                                                                order.status,
                                                                order.isPaid,
                                                            )}
                                                        </span>
                                                    </div>
                                                }
                                                key={order._id}
                                            >
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="border">
                                                            <td className="boder p-3">Mã đơn hàng</td>
                                                            <td className="boder p-3">Tên sản phẩm</td>
                                                            <td className="boder p-3">Kích thước</td>
                                                            <td className="boder p-3">Màu sắc</td>
                                                            <td className="boder p-3">Số lượng</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.products.map((product) => (
                                                            <tr className="border" key={product._id}>
                                                                <td className="border p-3">{order.orderNumber}</td>
                                                                <td className="border p-3">{product.name}</td>
                                                                <td className="border p-3">{product.size}</td>
                                                                <td className="border p-3">{product.color}</td>
                                                                <td className="border p-3 text-center">
                                                                    {product.quantity}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>

                                                <p className="text-base mt-3">
                                                    Tổng chi phí <span className="text-primary">${order.total}</span>
                                                    {order.status === Status.COMPLETE ? (
                                                        <div className="flex space-x-4 mt-4">
                                                            <div className="flex space-x-4 mt-4">
                                                                <div className="px-1 md:ml-0 ml-20">
                                                                    <Link to={`/orders/${order._id}/return`}>
                                                                        <Button type="dashed" className='bg-gree text-layer' onClick={onShow}>
                                                                            Hoàn đơn
                                                                        </Button>
                                                                    </Link>
                                                                    <Modal
                                                                        title="Update User"
                                                                        centered
                                                                        open={open}
                                                                        onOk={() => setOpen(false)}
                                                                        onCancel={() => setOpen(false)}
                                                                        width={1000}
                                                                        footer={null}
                                                                    >
                                                                        <Hoandon />
                                                                    </Modal>


                                                                </div>
                                                            </div>

                                                        </div>
                                                    ) : (
                                                        <div className="flex space-x-4 mt-4">
                                                           
                                                            <Button type="dashed" className='bg-gray-300 text-layer' disabled>
                                                                            Hoàn đơn
                                                                        </Button>
                                                          
                                                        </div>
                                                    )}
                                                </p>

                                                <Steps
                                                    className="mt-3"
                                                    items={[
                                                        {
                                                            title: 'Thông tin khách hàng',
                                                            status:
                                                                order.status >= Status.INFORMATION ? 'finish' : 'wait',
                                                            icon: <BsPersonVcardFill className="!text-primary"/>,
                                                        },
                                                        {
                                                            title: 'Xác nhận đơn hàng',
                                                            status:
                                                                order.status >= Status.ORDER_CONFIRM
                                                                    ? 'finish'
                                                                    : 'wait',
                                                            icon: <BsDropbox className="!text-primary"/>,
                                                        },
                                                        {
                                                            title: 'Đang giao hàng',
                                                            status: order.status >= Status.SHIPPING ? 'finish' : 'wait',
                                                            icon: <FaShippingFast className="!text-primary"/>,
                                                        },
                                                        {
                                                            title: order.status === 0 ? 'Đã hủy' : 'Hoàn thành',
                                                            status:
                                                                order.status === Status.COMPLETE
                                                                    ? 'finish'
                                                                    : order.status === Status.CANCELLED
                                                                    ? 'error'
                                                                    : 'wait',
                                                            icon:
                                                                order.status === Status.COMPLETE ? (
                                                                    <BsCheckCircleFill className="!text-green-500"/>
                                                                ) : Status.CANCELLED ? (
                                                                    <MdSmsFailed />
                                                                ) : (
                                                                    <BsCheckCircleFill/>
                                                                ),
                                                        },
                                                    ]}
                                                />
                                            </Panel>
                                        );
                                    })}
                                </Collapse>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderSumeries;
