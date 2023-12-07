import { Button, Form, FormInstance, Input, InputNumber } from 'antd';
import { Status } from '@/types/status';
import axios from 'axios';
import { reduceTotal } from '@/utils/reduce';
import { useState } from 'react';

interface Props {
    cartItems: any[];
    authData: {
        _id: string;
        email: string;
        username: string;
    };
    payMethod: number;
    form: FormInstance<any>;
}

export default function CheckoutForm({ authData, cartItems, payMethod, form }: Props) {
    const [methodPay, setMethodPay] = useState(0);

    const handleCheckout = (values: any) => {
        if (methodPay === 0) {
            const { ...rest } = values;

            axios
                .post('http://localhost:8080/stripe/create-checkout-session', {
                    cartItems,
                    userId: authData._id,
                    ...rest,
                    payMethod,
                    status: Status.INFORMATION,
                    total: Number(reduceTotal(cartItems)),
                })
                .then((res) => {
                    if (res.data.url) {
                        window.location = res.data.url;
                    }
                })
                .catch((err) => console.log(err.message));
        } else {
            const { ...rest } = values;
            axios
                .post('http://localhost:8080/api/vnpay/create_payment_url', {
                    amount: reduceTotal(cartItems),
                    bankCode: '',
                    orderDescription: 'vnpay',
                    orderType: 2,
                    language: '',
                    orderid: Math.random(),
                    userId: authData?._id,
                    products: cartItems,
                    ...rest,
                })
                .then((res) => {
                    window.location = res.data.url;
                });
        }
    };

    return (
        <Form id="payment-form" className="mt-4" form={form} layout="vertical" onFinish={handleCheckout}>
            <Form.Item initialValue={authData.username} label={'Tên đăng nhập'}>
                <Input disabled value={authData.username} />
            </Form.Item>
            <Form.Item
                rules={[
                    { required: true, message: 'Bắt buộc' },
                    { type: 'email', message: 'Phải đúng định dạng Email' },
                ]}
                label={'Email'}
                name={'email'}
            >
                <Input />
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: 'Bắt buộc' }]}
                label={'Địa chỉ chi tiết (Ví dụ: "Xã - Huyện/Quận - Tỉnh/Thành phố")'}
                name={'shipping'}
            >
                <Input />
            </Form.Item>

            <Form.Item rules={[{ required: true, message: 'Bắt buộc' }]} label={'Tên đẩy đủ'} name={'fullName'}>
                <Input />
            </Form.Item>

            <Form.Item
                rules={[{ required: true, message: 'Bắt buộc', type: 'number' }]}
                label={'Số điện thoại'}
                name={'phone'}
            >
                <InputNumber className="w-full" type="number" />
            </Form.Item>

            <Button htmlType="submit" onClick={() => setMethodPay(0)}>
                Thanh toán bằng Stripe
            </Button>

            <Button htmlType="submit" style={{marginLeft:10}} onClick={() => setMethodPay(1)}>
                Thanh toán bằng VNPay
            </Button>
        </Form>
    );
}
