import InputField from '@/components/ui/InputField';
import Loading from '@/components/ui/Loading';
import { useMeQuery, useSignupMutation } from '@/services/auth';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button, Checkbox, Form } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type FieldType = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword: string;
};

const Signup = () => {
    const router = useNavigate();

    const { data: authData, isLoading: authLoading } = useMeQuery();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassowrd] = useState<string>('');
    const [rule, setRule] = useState(false)

    const [register, { isLoading, isError, isSuccess, error }] = useSignupMutation();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await register({
                username,
                email,
                password,
                confirmPassword,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(((error as FetchBaseQueryError).data as any).message, { position: 'top-right' });
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Đăng ký thành công', { position: 'top-right' });
            setTimeout(() => router('/account/signin'), 4000);
        } else {
            return;
        }
    }, [isSuccess]);

    useEffect(() => {
        if (authData) {
            return router('/');
        }
    }, [authData]);

    return (
        <>
            {authData || authLoading ? (
                <Loading />
            ) : (
                <div>
                    {isSuccess && <Loading />}
                    <section className="bg-whit">
                        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                            <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                                <img
                                    alt="Night"
                                    src="https://tcorder.vn/wp-content/uploads/2015/06/ao-thun-nam-nhieu-mau-2.jpg"
                                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                                />

                                <div className="hidden lg:relative lg:block lg:p-12">
                                    <a className="block text-white" href="/">
                                        <span className="sr-only">Home</span>
                                        <svg
                                            className="h-8 sm:h-10"
                                            viewBox="0 0 28 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </a>

                                    <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                        Welcome to AShirt 🥼
                                    </h2>

                                    <p className="mt-4 leading-relaxed text-white/90">
                                        Tại đây chúng tôi cung cấp các mẫu áo thời trang nam hiện đại và đang hot nhất
                                        hiện nay.
                                    </p>
                                </div>
                            </section>

                            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                                <div className="max-w-xl lg:max-w-3xl">
                                    <div className="relative -mt-16 block lg:hidden">
                                        <a
                                            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                                            href="/"
                                        >
                                            <span className="sr-only">Home</span>
                                            <svg
                                                className="h-8 sm:h-10"
                                                viewBox="0 0 28 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>

                                        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                            Welcome to AShirt 🥼
                                        </h1>

                                        <p className="mt-4 leading-relaxed text-gray-500">
                                            Tại đây chúng tôi cung cấp các mẫu áo thời trang nam hiện đại và đang hot
                                            nhất hiện nay.
                                        </p>
                                    </div>

                                    <Form
                                        className="mt-8"
                                        onSubmitCapture={onSubmit}
                                        onFinishFailed={(err) => {
                                            if (err.errorFields.length !== 0) return;
                                        }}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                    >
                                        <Form.Item<FieldType>
                                            label="Tên đăng nhập"
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tên đăng nhập không được bỏ trống',
                                                    whitespace: true,
                                                },
                                                { min: 3, message: 'Ít nhất 3 lý tự' },
                                                {
                                                    pattern: new RegExp(
                                                        '^(?=[a-z-0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$',
                                                    ),
                                                    message: 'Tên đăng nhập không hợp lệ',
                                                },
                                                {
                                                    validator: (_, value) =>
                                                        value && value.trim()
                                                            ? Promise.resolve()
                                                            : Promise.reject('Không được có ký tự đặc biệt'),
                                                },
                                            ]}
                                        >
                                            <InputField
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                name="username"
                                                size="large"
                                                id="username"
                                                placeholder="Tên đăng nhập"
                                                prefix={<AiOutlineUser />}
                                                typeInput="text"
                                            />
                                        </Form.Item>
                                        <Form.Item<FieldType>
                                            label="Email"
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Email không được bỏ trống' },
                                                { whitespace: true },
                                                { type: 'email', message: 'Phải đúng định dạng email' },
                                            ]}
                                        >
                                            <InputField
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                name="email"
                                                size="large"
                                                id="email"
                                                placeholder="Email"
                                                prefix={<AiOutlineMail />}
                                                typeInput="text"
                                            />
                                        </Form.Item>




                                        <Form.Item<FieldType>
                                            label="Mật khẩu"
                                            name="password"
                                            rules={[
                                                { required: true, message: 'Mật khẩu không được để trống' },
                                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                                                { max: 20, message: 'Mật khẩu tối đa 20 ký tự' },
                                                // {
                                                //     pattern: new RegExp(
                                                //         '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
                                                //     ),
                                                //     message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt và 1 số',
                                                // },
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
                                                prefix={<AiOutlineLock />}
                                                typeInput="password"
                                            />
                                        </Form.Item>
                                        <Form.Item<FieldType>
                                            label="Xác nhận mật khẩu"
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
                                                prefix={<AiOutlineLock />}
                                                typeInput="password"
                                            />
                                        </Form.Item>

                                        <Checkbox onChange={(e) => setRule(e.target.checked)}>
                                            Bạn có đồng ý với điều khoản của chúng tôi
                                        </Checkbox>

                                        <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                                            <Button
                                                htmlType="submit"
                                                className="bg-primary/90"
                                                size="large"
                                                type="primary"
                                                disabled={!rule}
                                                loading={isLoading}
                                            >
                                                Đăng ký
                                            </Button>
                                        </div>

                                        <p className="mt-2 text-sm text-gray-500 sm:mt-0">
                                            Bạn đã có tài khoản?
                                            <Link to="/account/signin" className="ml-2 text-gray-700 underline">
                                                Đăng nhập
                                            </Link>
                                            .
                                        </p>
                                    </Form>
                                </div>
                            </main>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default Signup;
