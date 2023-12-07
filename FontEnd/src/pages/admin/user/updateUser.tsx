import { useGetUserByIdQuery, useUpdateUserMutation } from '@/services/user';
import { Button, Form, Input, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
    role?: string;
    phone?: number;
    email?: string;
    address?: string;
};

const { Option } = Select;

const UpdateUser: React.FC = () => {
    const router = useNavigate();
    const { id } = useParams();
    const { data: userData, isLoading } = useGetUserByIdQuery(id as string);
    const [updateUser, { isLoading: userLoading, isSuccess }] = useUpdateUserMutation();
    const [selectedItems, setSelectedItems] = useState<string>(userData?.data.role!);


    const onFinish = async (values: any) => {
        await updateUser({ _id: userData?.data._id, ...values, role: selectedItems });
    };

    useEffect(() => {
        isSuccess === true && router('/admin/user');
    }, [isSuccess]);

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const OPTIONS = ['admin', 'member', 'editor'];

    return (
        <>
            {isLoading && !userData ? (
                <Spin />
            ) : (
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        initialValue={userData?.data.username}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        initialValue={userData?.data.email}
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        initialValue={userData?.data.password}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Chức vụ"
                        name="role"
                        initialValue={userData?.data.role}
                        rules={[{ required: true, message: 'Hãy chọn roll cho tài khoản' }]}
                    >
                        <Select
                            placeholder="Hãy chọn chưc vụ cho tài khoản"
                            value={userData?.data.role}
                            onChange={setSelectedItems}
                            style={{ width: '100%' }}
                        >
                            {OPTIONS.map((opt, index) => (
                                <Option key={index} value={opt}>
                                    {opt}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Link to={`/admin/user`}>
                            <Button htmlType="button" type="default">
                                Trở lại
                            </Button>
                        </Link>

                        <Button loading={userLoading} htmlType="submit" type="default" className="ml-2">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default UpdateUser;
