import { Typography, Table, Button, Form } from "antd";
import { useGetOrderByIdQuery } from "@/services/order";
import React from "react";
import { PrinterOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Hoadon: React.FC<{ orderId: string }> = ({ orderId }) => {

    const { data: order, isLoading: isOrdersLoading } = useGetOrderByIdQuery(orderId);
    const currentDate = new Date().toLocaleString();

    if (isOrdersLoading) {
        return <div>Loading...</div>;
    }

    let totalAmount = 0;

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="invoice-title">
                                {order ? (
                                    <React.Fragment key={order._id}>
                                        <h4 className="float-end font-size-15">
                                            Hóa Đơn: {order.orderNumber}
                                            <span className={`badge ${order.status === 1 ? 'bg-success' : 'bg-danger'} font-size-12 ms-2`}>
                                                {order.payMethod === 1 ? "Paid" : " Unpaid"}
                                            </span>
                                        </h4>
                                        <div className="mb-4">
                                            <Title level={2} className="mb-1 text-muted">
                                                Alibaba.com
                                            </Title>
                                        </div>
                                        <div className="text-muted">
                                            <p className="mb-1">Cao đẳng FPT Polytechnic</p>
                                            <p className="mb-1">
                                                <i className="uil uil-envelope-alt me-1"></i>{" "}
                                                caodangfpt.hn@fpt.edu.vn
                                            </p>
                                            <p>
                                                <i className="uil uil-phone me-1"></i> 0981 725 836
                                            </p>
                                        </div>
                                    </React.Fragment>
                                ) : null}
                            </div>
          <hr className="my-4" />
                            {order ? (
                                <React.Fragment>

                                    <div className="container">
                                        <div className="flex">
                                            <div className="col-lg-6">
                                                <div className="text-muted">
                                                    <Title level={5} className="font-size-16 mb-3">
                                                        Khách Hàng:
                                                    </Title>
                                                    <Title level={5} className="font-size-15 mb-2 text-black">

                                                        Name :   {order.fullName}
                                                    </Title>
                                                    <p className="mb-1">Địa chỉ : {order.shipping}</p>
                                                    <p className="mb-1">Email : {order.email}</p>
                                                    <p>Số điện thoại : 0{order.phone}</p>
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="text-muted text-lg-end">
                                                    <div>
                                                        <Title level={5} className="font-size-15 mb-1">
                                                            Hóa Đơn:
                                                        </Title>
                                                        <p>{order.orderNumber}</p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Title level={5} className="font-size-15 mb-1">
                                                            Ngày lập hóa đơn:
                                                        </Title>
                                                        <p>{currentDate}</p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Title level={5} className="font-size-15 mb-1">
                                                            Mã đơn hàng:
                                                        </Title>
                                                        <p>#{order._id}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive mt-4">


                                        <Table

                                            dataSource={order.products.map((product, index) => {
                                                let productIndex = index + 1;
                                                const productTotal = product.price * product.quantity;
                                                totalAmount += productTotal;

                                                return {
                                                    key: productIndex,
                                                    item: product.name,
                                                    price: `$ ${product.price}`,
                                                    quantity: product.quantity,
                                                    total: `$ ${productTotal.toFixed(2)}`
                                                };
                                            })}
                                            columns={[
                                                {
                                                    title: "No.",
                                                    dataIndex: "key",
                                                    key: "key",
                                                    width: 70
                                                },
                                                {
                                                    title: "Item",
                                                    dataIndex: "item",
                                                    key: "item"
                                                },
                                                {
                                                    title: "Price",
                                                    dataIndex: "price",
                                                    key: "price"
                                                },
                                                {
                                                    title: "Quantity",
                                                    dataIndex: "quantity",
                                                    key: "quantity"
                                                },
                                                {
                                                    title: "Total",
                                                    dataIndex: "total",
                                                    key: "total"
                                                }
                                            ]}
                                            pagination={false}
                                            size="small"
                                        />
                                    </div>


                                    <div className="py-2">
                                        <div className="d-flex justify-content-between align-items-center border-top border-bottom py-2">
                                            <span className="font-size-15">Order Summary</span>
                                            <span className="font-size-15">Tổng: ${totalAmount.toFixed(2)}</span>
                                        </div>

                                    </div>


                                    <div className="d-print-none mt-4">
                                        <div className="float-end">
                                            <Button type="primary" className="me-1 bg-primary" onClick={() => window.print()}>
                                                <PrinterOutlined /> Print
                                            </Button>

                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <div>Loading product...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Hoadon;
