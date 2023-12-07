import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateSizeMutation } from '@/services/size';

interface AddSizeProps {
  handleModalClose: () => void;
}

const AddSize: React.FC<AddSizeProps> = ({ handleModalClose }) => {
  const [form] = Form.useForm();
  const [mutateCreateSize] = useCreateSizeMutation();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true); 
      await mutateCreateSize(values).unwrap();

      form.resetFields();
      toast.success('Tạo Size thành công');
      handleModalClose();
    } catch (error) {
      toast.error('Tạo Size không thành công');
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
            { required: true, message: 'Vui lòng nhập tên size' },
          ]}
        >
          <Input placeholder="Tên Size" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" className='bg-primary' htmlType="submit" loading={isLoading}>
            Tạo Size
          </Button>
        </Form.Item>
      </Form>
     
    </>
  );
};

export default AddSize;