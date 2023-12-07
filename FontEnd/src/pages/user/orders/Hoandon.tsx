import { useGetOrderByIdQuery, useReturnOrderMutation } from '@/services/order';
import { Carousel, Form, Input, Select, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdSmsFailed } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { Status } from '@/types/status';
import { Button } from 'antd/es/radio';
import { formartVND } from '@/utils/formartVND';
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const Hoandon: React.FC = () => {
  const { id } = useParams();
  const { data: orderDetail, isLoading, isError } = useGetOrderByIdQuery(id as string);
  const [returnOrder] = useReturnOrderMutation();
  const [form] = Form.useForm()
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (isError) {
    return <div>Có lỗi xảy ra khi tải thông tin đơn hàng</div>;
  }
  const handleRefund = () => {
    form
      .validateFields(['LydoHoandon', 'Motahoandon', 'email'])
      .then((values) => {
        const { LydoHoandon, Motahoandon, email } = values;
        if (!LydoHoandon || !Motahoandon || !email) {
          setIsCompleted(false);
          console.error('Vui lòng điền đầy đủ thông tin!');
          return;
        }
        returnOrder({ orderId: id as string, LydoHoandon, Motahoandon, Emaill: email })
          .unwrap()
          .then((returnedOrder) => {
            console.log('Order returned:', returnedOrder);
            navigate("/orders/${orderDetail?._id");
            setIsCompleted(true);
          })
          .catch((error) => {
            console.error('Error returning order:', error);
            setIsCompleted(false);
          });
      })
      .catch(() => {
     
        setIsCompleted(false);
        console.error('Vui lòng điền đầy đủ thông tin!');
      });
  };
  return (

    <div className='bg-gray-100 py-2'>
      {orderDetail ? (

        <div className="">
          <div className="max-w-5xl mx-auto bg-white py-4 mt-2">
            <div className="px-4 py-2">
              <div className="text-xl">Sản phẩm cần Hoàn tiền ngay (không trả hàng) </div>
              <div className='mt-4 '>
                <div className="">
                  <div className="">
                    {orderDetail.products.map((product, index) => (
                      <div key={index} className='mt-4'>
                        <Carousel >
                          {product.images.map((image, imgIndex) => (
                            <div key={imgIndex}>
                              <div className="flex">
                                <div className="w-32">
                                  <img src={image} alt={`Product ${index + 1}`} className="w-full" />
                                </div>
                                <div className="px-3">
                                  <div className="ml-2">{product.name}</div>
                                  <div className="flex items-center">
                                    <span className={`ml-2 ${orderDetail.status === Status.COMPLETE ? 'text-green-500' : 'text-red-500'}`}>
                                      {orderDetail.status === Status.COMPLETE ? 'Đã giao' : 'Đã hủy'}
                                    </span>
                                    <span className="ml-2">
                                      {orderDetail.status === Status.COMPLETE ? <BsCheckCircleFill /> : <MdSmsFailed />}
                                    </span>
                                  </div>

                                  <div className="ml-2">
                                    x{product?.quantity}
                                  </div>
                                  <div className="ml-2">
                                    {product.price}

                                  </div>
                                  <td className="product-total  ml-2">Tổng :{formartVND(product.price * product.quantity)}</td>
                                </div>

                              </div>
                            </div>
                          ))}
                        </Carousel>

                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>
          <div className="max-w-5xl mx-auto bg-white  py-4 mt-3">
            <div className="px-4 py-2">
              <div className="text-xl">Lý do Hoàn tiền ngay (không trả hàng)? </div>

              <div className="mt-4">
                <Form form={form}>
                  <Form.Item

                    name="LydoHoandon"
                    label="Lý do "
                    className="w-5/12"
                    rules={[
                      {
                        required: true,
                        message: 'Lý do trả hàng là bắt buộc!',
                      },
                    ]}
                  >
                    <Select placeholder="Chọn  lý do" optionFilterProp="children" className='ml-1'>
                      <Select.Option value="lỗi sản phẩm">Lỗi sản phẩm</Select.Option>
                      <Select.Option value="không đúng kích cỡ">Không đúng kích cỡ</Select.Option>
                      <Select.Option value="không đúng màu sắc">Không đúng màu sắc</Select.Option>
                      <Select.Option value="Hàng không đúng">Hàng không đúng </Select.Option>
                      <Select.Option value="Hàng giả, nhái">Hàng giả, nhái</Select.Option>
                      <Select.Option value="shipper quỵti tiền">shipper quỵti tiền</Select.Option>

                    </Select>
                  </Form.Item>
                </Form>
              </div>
              <div className="">
                <Form form={form}>
                  <Form.Item
                    name="Motahoandon"
                    label="Mô tả"
                    className="w-5/12 "
                    rules={[
                      {
                        required: true,
                        message: 'Mô tảf là cần thiết!',
                      },
                    ]}
                  >

                    <TextArea
                      showCount
                      maxLength={100}
                      style={{ height: 120, marginBottom: 24 }}
                      className=''
                      placeholder="Mô tả sản phẩm"
                    />


                  </Form.Item>
                </Form>
              </div>

            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white py-4 mt-3">
            <div className="px-4 py-2">
              <div className="text-xl">Thông tin Hoàn tiền </div>
              <div className='mt-4 '>

                <div className='px-2'> Số tiền hoàn lại: ₫ {orderDetail.total}</div>

              </div>
           
              <Form form={form}>
                <Form.Item
                  label="Email"
                  name="email"
                  className="w-5/12"
                  rules={[
                    {
                      type: 'email',
                      message: 'Email không hợp lệ!',
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập địa chỉ email!',
                    },
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ Email của bạn" type="text" className='ml-1'/>
                </Form.Item>

              </Form>
            </div>


            <div className="flex justify-between mt-20">
              <div className="ml-auto">
                <div className="mr-10">Số tiền hoàn nhận được: ₫ {orderDetail.total}</div>
                <div className="">

                  
                    <Button type="primary" className='mt-12'  onClick={handleRefund}>
                      Hoàn thành
                    </Button>
                
                </div>
              </div>
            </div>

          </div>



        </div>
      ) : (
        <div>Không tìm thấy thông tin đơn hàng</div>
      )}
    </div>
  );
}

export default Hoandon
   