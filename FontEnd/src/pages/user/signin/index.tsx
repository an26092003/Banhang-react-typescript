import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import { AiOutlineUser, AiOutlineEyeInvisible, AiOutlineEye, AiOutlineLock } from 'react-icons/ai';
import { useSigninMutation } from '@/services/auth';
import { FormEvent, useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';
import InputField from '@/components/ui/InputField';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { checkAuth } from '@/utils/checkAuth';
import { toast } from 'react-toastify';
import { checkEditor } from '@/utils/checkEditor';
import { checkAdmin } from '@/utils/checkAdmin';


const { Text } = Typography;
const Signin = () => {
    const router = useNavigate();

    const { data: authData, isLoading: authLoading } = checkAuth();
    const { data: authAdmin} = checkAdmin();
    const { data: authEditor } = checkEditor();

    const [signin, { isLoading, isError, error, isSuccess }] = useSigninMutation();

    const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');

    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await signin({
            usernameOrEmail,
            password,
        });
    };
    useEffect(() => {

        if (authData) {
            if (isSuccess) {
                toast.success('Đăng nhập thành công', { position: 'top-right' });
                if (authEditor?.role === "editor") {
                    setTimeout(() => router('/editor'), 2000)
                } else  if (authAdmin?.role === "admin") {
                    setTimeout(() => router('/admin'), 2000)
                } else {
                    setTimeout(() => router('/'), 2000)
                }
            }
        }

    }, [authData, isSuccess, authEditor ,authAdmin]);


    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success('Đăng nhập thành công', { position: 'top-right' });
    //         setTimeout(() => router('/'), 4000);
    //     } else {
    //         return;
    //     }
    // }, [isSuccess]);

    // useEffect(() => {
    //     if (authData) {
    //         return router('/');
    //     }
    // }, [authData]);

    return (
        <>
            {authData || authLoading ? (
                <Loading />
            ) : (
                <div>
                    {isSuccess && <Loading />}
                    <section className="bg-white">
                        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                                <img
                                    alt="Pattern"
                                    src="https://bizweb.dktcdn.net/100/399/392/files/nhung-thuong-hieu-quan-ao-viet-nam-7.jpg?v=1615448760018"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </aside>

                            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                                <div className="max-w-xl lg:max-w-3xl">
                                    <a className="block text-blue-600" href="/">
                                        <span className="sr-only">Home</span>
                                    </a>

                                    <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                        Đăng nhập
                                    </h1>

                                    <p className="mt-4 leading-relaxed text-gray-500">
                                        Tại đây chúng tôi cung cấp các mẫu áo thời trang nam hiện đại và đang hot nhất
                                        hiện nay.
                                    </p>
                                    <hr />
                                    <form action="#" className="mt-8 gap-6" onSubmit={handleSubmit}>
                                        <Space direction="vertical" className="w-full">
                                            <InputField
                                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                                                typeInput="text"
                                                size="large"
                                                placeholder="Email"
                                                prefix={<AiOutlineUser />}
                                                status={isError ? 'error' : ''}
                                            />

                                            <InputField
                                                onChange={(e) => setPassword(e.target.value)}
                                                typeInput="password"
                                                prefix={<AiOutlineLock />}
                                                placeholder="Mật khẩu"
                                                status={isError ? 'error' : ''}
                                                size="large"
                                                iconRender={(visible) =>
                                                    visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                                }
                                            />
                                        </Space>

                                        {isError && error !== undefined && (
                                            <div className="mt-2">
                                                <Text type="danger">
                                                    {((error as FetchBaseQueryError).data as any).message}
                                                </Text>
                                            </div>
                                        )}

                                        <div className="col-span-6 mt-4">
                                            <label className="flex gap-4">

                                                <a
                                                    href="/account/forgot-password"
                                                    className="hover:text-primary/90 hover:underline text-sm text-gray-700"
                                                >
                                                    Quên mật khẩu ?
                                                </a>
                                            </label>
                                        </div>

                                        <div className="col-span-6 mt-6 sm:flex sm:items-center sm:gap-4">
                                            <Button
                                                htmlType="submit"
                                                className="bg-primary/90"
                                                size="large"
                                                type="primary"
                                                loading={isLoading}
                                            >
                                                Đăng nhập
                                            </Button>
                                        </div>
                                        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                            Bạn chưa có tài khoản?
                                            <Link to="/account/signup" className="ml-2 text-gray-700 underline">
                                                Đăng ký
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </main>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default Signin;
