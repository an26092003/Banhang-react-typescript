import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetByIdColorQuery, useUpdateColorMutation } from '@/services/color';

const UpdateColor: React.FC<{ id: string; handleUpdateComplete: () => void }> = ({
  id,
  handleUpdateComplete,
}) => {
  const [form] = Form.useForm();
  const [mutate] = useUpdateColorMutation();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: { name: string}) => {
    try {
      setIsLoading(true);
      await mutate({ id, color: { name: values.name } }).unwrap();
      console.log(id);
      
      handleUpdateComplete();
      toast.success('Cập nhật thành công');
    } catch (error) {
      console.error('Update Color failed:', error);
      toast.error('Cập nhật thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const { data: color, isLoading: isColorLoading } = useGetByIdColorQuery(id);

  useEffect(() => {
    if (color) {
      form.setFieldsValue({ name: color.name });
    }
  }, [color]);

  return (
    <>
      {isColorLoading ? (
        <div>Loading...</div>
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên Color' }]}>
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

export default UpdateColor;