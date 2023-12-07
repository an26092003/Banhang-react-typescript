import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCreateBrandMutation } from '@/services/brand';

interface AddbrandProps {
  handleModalClose: () => void;
}

const AddBrand: React.FC<AddbrandProps> = ({ handleModalClose }) => {
  const [form] = Form.useForm();
  const [mutateCreateBrand] = useCreateBrandMutation();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
  
   
  
      await mutateCreateBrand(values).unwrap();
  
      form.resetFields();
      toast.success('Tạo Thương Hiệu thành công');
      handleModalClose();
    } catch (error) {
      toast.error('Tạo Thương Hiệu không thành công');
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
            { required: true, message: 'Vui lòng nhập tên Thương Hiệu' },
            { min: 2, message: 'Ít nhất 2 ký tự' },
          ]}
        >
          <Input placeholder="Tên Thương Hiệu" />
        </Form.Item>
       
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" className='bg-primary' htmlType="submit" loading={isLoading}>
            Tạo thương Hiệu
          </Button>
        </Form.Item>
      </Form>
     
    </>
  );
};

export default AddBrand;