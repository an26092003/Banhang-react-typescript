import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateColorMutation } from '@/services/color';

interface AddColorProps {
  handleModalClose: () => void;
}

const AddColor: React.FC<AddColorProps> = ({ handleModalClose }) => {
  const [form] = Form.useForm();
  const [mutateCreateColor] = useCreateColorMutation();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true); 
      await mutateCreateColor(values).unwrap();

      form.resetFields();
      toast.success('Tạo Color thành công');
      handleModalClose();
    } catch (error) {
      toast.error('Tạo Color không thành công');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên màu' },
            { min: 2, message: 'Ít nhất 2 ký tự' },
          ]}
        >
          <Input placeholder="Tên Color" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" className='bg-primary' htmlType="submit" loading={isLoading}>
            Tạo Color
          </Button>
        </Form.Item>
      </Form>
     
    </>
  );
};

export default AddColor;