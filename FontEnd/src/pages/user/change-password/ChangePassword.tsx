import InputField from '@/components/ui/InputField';
import { useChangePasswordMutation } from '@/services/auth';
import { Button, Form, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
};

const ChangePassword = () => {
    const query = useQuery();
    const router = useNavigate();

    const token = query.get('token');
    const userId = query.get('userId');

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassowrd] = useState<string>('');

    const [changePassword, { data, isLoading, isError, isSuccess }] = useChangePasswordMutation();

    const onSubmit = async (values: any) => {
        try {
            changePassword({
                password: values.password,
                token: token!,
                userId: userId!,
            });
        } catch (error) {}
    };

    useEffect(() => {
        if (isError) return message.error('Token của bạn đã hết hạn vui lòng thử lại');
        if (isSuccess === true && data?.success === true) {
            router('/account/signin');
            message.success('Thay đổi mật khẩu thành công');
        }
    }, [isError, isSuccess, data]);

    return (
        <div className="max-w-4xl mx-auto mt-24">
            <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900">
                <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
                    <h1 className=" mb-6 text-3xl font-bold text-center">Đừng lo</h1>
                    <p className="text-center mx-12">
                        Chúng tôi ở đây để giúp bạn khôi phục mật khẩu của mình. Nhập địa chỉ email bạn đã sử dụng khi
                        tham gia và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu.
                    </p>
                    <Form className="w-ful" onFinish={onSubmit}>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Mật khẩu không được để trống' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                                { max: 20, message: 'Mật khẩu tối đa 20 ký tự' },
                                {
                                    pattern: new RegExp(
                                        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
                                    ),
                                    message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt và 1 số',
                                },
                                { whitespace: true },
                            ]}
                        >
                            <InputField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                size="large"
                                id="password"
                                placeholder="Mật khẩu"
                                typeInput="password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Xác nhận mật khẩu không được bỏ trống',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('Mật khẩu không khớp');
                                    },
                                }),
                            ]}
                        >
                            <InputField
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassowrd(e.target.value)}
                                name="confirmPassword"
                                size="large"
                                id="confirmPassword"
                                placeholder="Mật khẩu (như trên)"
                                typeInput="password"
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
                            href="/account/signin"
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
};

export default ChangePassword;
