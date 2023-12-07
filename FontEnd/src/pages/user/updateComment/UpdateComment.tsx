import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetByIdCommentsQuery, useUpdateCommentMutation } from '@/services/comment';

const UpdateComment: React.FC<{userId:string, productId:string, commentId: string; handleUpdateComplete: () => void }> = ({
    commentId,
    productId,
    userId,
    handleUpdateComplete,
}) => {
    const [form] = Form.useForm();
    const [mutate] = useUpdateCommentMutation();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values: { text: string }) => {
        try {
            setIsLoading(true);
            await mutate({productId, userId, commentId, comment: { text: values.text } }).unwrap();
            handleUpdateComplete();
            toast.success('Cập nhật thành công');
        } catch (error) {
            console.error('Update bình luận failed:', error);
            toast.error('Cập nhật thất bại');
        } finally {
            setIsLoading(false);
        }
    };


    const { data: comment, isLoading: isCategoryLoading } = useGetByIdCommentsQuery(commentId);
    // console.log(commentId);
    // console.log(productId,"productsId");
    // console.log(userId, "userId");
    
    


    useEffect(() => {
        if (!isCategoryLoading && comment) {
            form.setFieldsValue({ text: comment.text });
            console.log(form.setFieldsValue);
            
        }
    }, [comment, isCategoryLoading, form]);

    return (
        <>
            {isCategoryLoading ? (
                <div>Loading...</div>
            ) : (
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Form.Item label="bình luận" name="text" rules={[{ required: true, message: 'Vui lòng nhập bình luận' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                        <Button type="primary" className='bg-primary' htmlType="submit" loading={isLoading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default UpdateComment;