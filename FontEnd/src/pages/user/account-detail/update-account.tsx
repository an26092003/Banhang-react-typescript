import { useMeQuery } from '@/services/auth';
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/services/user';
import { Button, Form, Input, Spin, message } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

type FieldType = {
    username?: string;
    password?: string;
    role?: string;
    phone?: number;
    email?: string;
    address?: string;
};

interface Props {
    setOpenAddModal:Dispatch<SetStateAction<boolean>>
}

const UpdateAccount: FC<Props> = ({
    setOpenAddModal
}) => {
    const { data: authData } = useMeQuery();
    const [form] = Form.useForm();

    const id: string | undefined = authData?._id as string | undefined;

    const { data: userData, isLoading } = useGetUserByIdQuery(id as string);
    const [updateUser, { isLoading: userLoading }] = useUpdateUserMutation();

    useEffect(() => {
        form.setFieldsValue({
            username: authData?.username,
            email: authData?.email,
            password: ''
        });
    }, [form]);

    const onFinish = (values: any) => {
        try {           
            updateUser({ _id: authData?._id, ...values });
            message.success('Cập nhật thành công');
            setOpenAddModal(false)

        } catch (error:any) {
            message.error(error.message)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {isLoading && !userData ? (
                <Spin />
            ) : (
                <Form
                    name="basic"
                    form={form}
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
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Mật khẩu">
                        <Input.Password value={userData?.data.password} disabled />
                    </Form.Item>
                    <Form.Item<FieldType> label="Mật khẩu mới" name={'password'}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button loading={userLoading} htmlType="submit" type="default" className="ml-2">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default UpdateAccount;
