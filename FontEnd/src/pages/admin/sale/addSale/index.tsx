import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateDiscountsMutation } from '@/services/discount';
import { isValid, parseISO, isBefore } from 'date-fns';

interface AddDiscountProps {
   handleModalClose: () => void;
}
const AddSale: React.FC<AddDiscountProps> = ({ handleModalClose }) => {
   const [form] = Form.useForm();
   const [mutateCreateDiscount] = useCreateDiscountsMutation();
   const [isLoading, setIsLoading] = useState(false);
   const onFinish = async (values: any) => {
      try {
         setIsLoading(true);
         if (
            !isValid(parseISO(values.startDate)) ||
            !isValid(parseISO(values.endDate)) ||
            !isBefore(parseISO(values.startDate), parseISO(values.endDate))
         ) {
            toast.error('Ngày không hợp lệ hoặc ngày kết phải sau ngày tạo');
            return;
         }
         await mutateCreateDiscount(values).unwrap();

         form.resetFields();
         toast.success('Tạo mã giảm giá thành công');
         handleModalClose();
      } catch (error) {
         toast.error('Tạo mã giảm giá không thành công');
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
               label="Mã code"
               name="code"
               rules={[
                  { required: true, message: 'Vui lòng nhập mã giảm giá ' },
                  { min: 5, message: 'Ít nhất 5 ký tự' },
                  { max: 12, message: 'Không lớn hơn 12 kí tự' },
                  {
                     pattern: /^[A-Z0-9]+$/,
                     message: 'Chỉ chấp nhận chữ in hoa và số, không chấp nhận ký tự đặc biệt',
                  },
               ]}
            >
               <Input placeholder="Mã code " />
            </Form.Item>
            <Form.Item
               label="giảm giá "
               name="discount"
               rules={[
                  { required: true, message: 'Vui lòng nhập phần trăm giảm giá  ' },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        const intValue = parseInt(value, 10);
                        return (!isNaN(intValue) && Number.isInteger(intValue) && intValue >= 0 && intValue <= 70)
                           ? Promise.resolve()
                           : Promise.reject(new Error('Vui lòng nhập số không âm và không lớn hơn 70'));
                     },
                  }),
               ]}
            >
               <Input placeholder="Nhập phần trăm giảm giá " />
            </Form.Item>
            <Form.Item
               label="Số lượng "
               name="count"
               rules={[
                  { required: true, message: 'Vui lòng nhập số lượng mã giảm giá  ' },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        const intValue = parseInt(value, 10);
                        return (!isNaN(intValue) && intValue >= 0 && intValue <= 100)
                           ? Promise.resolve()
                           : Promise.reject(new Error('Vui lòng nhập số không âm và không lớn hơn 100'));
                     },
                  }),
               ]}
            >
               <Input placeholder="Mã code " />
            </Form.Item>

            <Form.Item
               label="Giá tối thiểu để sử dụng"
               name="maxAmount"
               rules={[
                  { required: true, message: 'Vui lòng nhập giá tối thiểu để sử dụng mã giảm giá  ' },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        const intValue = parseInt(value, 10);
                        return (
                           !isNaN(intValue) &&
                           intValue >= 0 &&

                           intValue % 2 === 0 // Kiểm tra số chẵn
                        )
                           ? Promise.resolve()
                           : Promise.reject(new Error('Vui lòng nhập số chẵn không âm '));
                     },
                  }),
               ]}
            >
               <Input placeholder="Nhập giá tối thiểu để sử dụng mã giảm giá " />
            </Form.Item>
            <Form.Item
               label="Ngày tạo"
               name="startDate"
               rules={[
                  { required: true, message: 'Vui lòng nhập ngày tạo' },
                  { type: 'date', message: 'Vui lòng nhập đúng định dạng ngày' },
               ]}
            >
               <Input placeholder="Ngày tạo" type="date" />
            </Form.Item>
            <Form.Item
               label="Ngày kết"
               name="endDate"
               rules={[
                  { required: true, message: 'Vui lòng nhập ngày kết' },
                  { type: 'date', message: 'Vui lòng nhập đúng định dạng ngày' },
               ]}
            >
               <Input placeholder="Ngày kết" type="date" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
               <Button type="primary" className='bg-primary' htmlType="submit" loading={isLoading}>
                  Tạo mã
               </Button>
            </Form.Item>
         </Form>
      </>
   );
};
export default AddSale;
