import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetCatgoryByIdQuery, useUpdateCategoryMutation } from '@/services/category';
import UploadFileServer from '@/components/uploads/UploadFile';



const UpdateCategory: React.FC<{ categoryId: string; handleUpdateComplete: () => void }> = ({
  categoryId,
  handleUpdateComplete,
}) => {
  const [form] = Form.useForm();
  const [mutate] = useUpdateCategoryMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { data: category,isLoading: isCategoryLoading } = useGetCatgoryByIdQuery(categoryId);
  const [img, setImages] = useState<string[]>([]);

  const onFinish = async (values: any) => {
    try {

  
      setIsLoading(true);
      await mutate({ categoryId, category: { ...values, img } }).unwrap();
      console.log(categoryId);

      handleUpdateComplete();
      toast.success('Cập nhật thành công');
    } catch (error) {
      console.error('Update category failed:', error);
      toast.error('Cập nhật thất bại');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (category) {
      form.setFieldsValue({ name: category.name, img: category.img });
      
      setImages(category.img || []); 
    }
  }, [category, form]);
  
  return (
    <>
      {isCategoryLoading ? (
        <div>Loading...</div>
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Thêm ảnh">
                <UploadFileServer images={img} setImages={setImages} />
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

export default UpdateCategory;