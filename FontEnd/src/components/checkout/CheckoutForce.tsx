
import {  Form, Input } from 'antd';

type Props = {};

const CheckoutForce = ({}: Props) => {

    

    return (
        <div>
            <Form layout="horizontal">
                <Form.Item name={'email'} label="Địa chỉ email" rules={[{ required: true, message: 'Bắt buộc' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={'fullName'} label="Tên đầy đủ" rules={[{ required: true, message: 'Bắt buộc' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name={'shipping'}
                    rules={[{ required: true, message: 'Bắt buộc' }]}
                    style={{ marginBottom: 10 }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name={'phone'}
                    rules={[{ required: true, message: 'Bắt buộc' }]}
                    style={{ marginBottom: 10 }}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
};

export default CheckoutForce;