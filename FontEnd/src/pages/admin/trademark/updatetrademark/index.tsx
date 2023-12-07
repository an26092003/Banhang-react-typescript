import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useGetBrandIdQuery, useUpdateBrandMutation } from '@/services/brand';

const UpdateBrand: React.FC<{ brandId: string; handleUpdateComplete: () => void }> = ({
    brandId,
  handleUpdateComplete,
}) => {
  const [form] = Form.useForm();
  const [mutate] = useUpdateBrandMutation();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: { name: string}) => {
    try {
      setIsLoading(true);
      await mutate({ brandId, brand: { name: values.name } }).unwrap();
      console.log(brandId);
      
      handleUpdateComplete();
      toast.success('Cập nhật thành công');
    } catch (error) {
      console.error('Update size failed:', error);
      toast.error('Cập nhật thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const { data: brand, isLoading: isBrandLoading } = useGetBrandIdQuery(brandId);

  useEffect(() => {
    if (brand) {
      form.setFieldsValue({ name: brand.name });
    }
  }, [brand]);

  return (
    <>
      {isBrandLoading ? (
        <div>Loading...</div>
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên Thương Hiệu' }]}>
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

export default UpdateBrand;