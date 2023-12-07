import OptInput from '@/components/opt/OptInput';
import { useForgotPasswordMutation } from '@/services/auth';
import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const ForgotPassword = () => {
    const [forgotPassword, { data, isLoading }] = useForgotPasswordMutation();
    const [email, setEmail] = useState<string>('');

    
    let OTP = Math.floor(1000 + Math.random() * 9000);
    const onSubmit = async (values: any) => {
        try {
            forgotPassword({
                ...values,
                otp: OTP,
            });
        } catch (error) {
            message.error('Có lỗi xảy ra vui lòng kiểm tra lại email của bạn');
        }
    };

    let body;

    if (data?.success === true) {
        body = <OptInput email={email} otp={data.otp} token={data.token} userId={data.userId}/>;
    } else {
        body = (
            <div className="max-w-4xl mx-auto mt-24">
                <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900">
                    <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
                        <h1 className=" mb-6 text-3xl font-bold text-center">Đừng lo</h1>
                        <p className="text-center mx-12">
                            Chúng tôi ở đây để giúp bạn khôi phục mật khẩu của mình. Nhập địa chỉ email bạn đã sử dụng
                            khi tham gia và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu.
                        </p>
                        <Form className="space-y-6 w-ful" onFinish={onSubmit}>
                            <Form.Item
                                name={'email'}
                                rules={[
                                    { required: true, message: 'Email không được bỏ trống' },
                                    { type: 'email', message: 'Phải đúng định dạng email' },
                                ]}
                            >
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="large"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                                    placeholder="Email address"
                                />
                            </Form.Item>
                            <div>
                                <Button
                                    loading={isLoading}
                                    htmlType="submit"
                                    size="large"
                                    className="w-full font-medium text-center text-white bg-indigo-600 transition-colors duration-200 rounded-md bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/90 focus:ring-offset-1"
                                >
                                    Gửi
                                </Button>
                            </div>
                        </Form>
                        <div className="text-sm text-gray-600 items-center flex justify-between">
                            <a
                                href="/"
                                className="text-gray-800 gap-x-2 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4"
                            >
                                <BsArrowLeft />
                                <span> Trở lại</span>
                            </a>
                            <p className="hover:text-blue-500 cursor-pointer">Cần giúp đỡ?</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        data?.success === false ? message.error('Email không hợp lệ') : null;
    }, [data]);

    return <div className="max-w-4xl mx-auto mt-24">{body}</div>;
};

export default ForgotPassword;
