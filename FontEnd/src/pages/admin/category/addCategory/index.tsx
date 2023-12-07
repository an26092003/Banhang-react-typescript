import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { useCreateCategoryMutation } from '@/services/category';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import UploadFile from '@/components/uploads/upload';



interface AddCategoryProps {
  handleModalClose: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ handleModalClose }) => {
  const [form] = Form.useForm();
  const [mutateCreateCategory] = useCreateCategoryMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImages] = useState<string[]>([]);
  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);

      values.img = img;

      await mutateCreateCategory(values).unwrap();

      form.resetFields();
      toast.success('Tạo danh mục thành công');
      handleModalClose();
    } catch (error) {
      toast.error('Tạo danh mục không thành công');
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
            { required: true, message: 'Vui lòng nhập tên danh mục' },
            { min: 2, message: 'Ít nhất 2 ký tự' },
          ]}
        >
          <Input placeholder="Tên danh mục" />
        </Form.Item>
        <Form.Item label="Thêm ảnh">
          <UploadFile setImages={setImages} />
        </Form.Item>

       
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" className='bg-primary' htmlType="submit" loading={isLoading}>
            Tạo danh mục
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCategory;