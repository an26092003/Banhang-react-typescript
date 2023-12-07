import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isValid, parseISO, isBefore } from 'date-fns';
import { useGetDiscountsByIdQuery, useUpdateDiscountsMutation } from '@/services/discount';

const UpdateSale: React.FC<{ categoryId: string; handleUpdateComplete: () => void }> = ({
      categoryId,
      handleUpdateComplete,
}) => {
      const [form] = Form.useForm();
      const [mutate] = useUpdateDiscountsMutation();
      const [isLoading, setIsLoading] = useState(false);

      const onFinish = async (values: { name: string, discount: number, count: number, maxAmount: number }) => {
            try {
                  setIsLoading(true);
                  const { name, discount, count, maxAmount } = values;

                  // Kiểm tra và lấy giá trị của ngày bắt đầu và kết thúc
                  const startDateValue = form.getFieldValue('createdDate');
                  const endDateValue = form.getFieldValue('endDate');

                  const startDateIsValid = isValid(parseISO(startDateValue));
                  const endDateIsValid = isValid(parseISO(endDateValue));

                  if (!startDateIsValid || !endDateIsValid) {
                        toast.error('Ngày không hợp lệ');
                        return;
                  }

                  if (isBefore(parseISO(endDateValue), parseISO(startDateValue))) {
                        toast.error('Ngày kết thúc phải sau ngày bắt đầu');
                        return;
                  }

                  // Gọi mutate với các thông tin cần cập nhật, bao gồm cả ngày bắt đầu và kết thúc
                  await mutate({
                        categoryId,
                        category: {
                              code: name,
                              discount,
                              count,
                              maxAmount,
                              startDate: startDateValue,
                              endDate: endDateValue,
                        }
                  }).unwrap();

                  handleUpdateComplete();
                  toast.success('Cập nhật thành công');
            } catch (error) {
                  console.error('Update category failed:', error);
                  toast.error('Cập nhật thất bại');
            } finally {
                  setIsLoading(false);
            }
      };
      const { data: category, isLoading: isCategoryLoading } = useGetDiscountsByIdQuery(categoryId);

      useEffect(() => {
            if (category) {
                  form.setFieldsValue({
                        name: category.code,
                        discount: category.discount,
                        count: category.count,
                        maxAmount: category.maxAmount,
                        createdDate: category.startDate,
                        endDate: category.endDate,
                  });
            }
      }, [category]);
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
                              <Form.Item label="Code mã" name="name" rules={[
                                    { required: true, message: 'Vui lòng nhập mã giảm giá ' },
                                    { min: 5, message: 'Ít nhất 5 ký tự' },
                                    { max: 12, message: 'Không lớn hơn 12 kí tự' },
                                    {
                                          pattern: /^[A-Z0-9]+$/,
                                          message: 'Chỉ chấp nhận chữ in hoa và số, không chấp nhận ký tự đặc biệt',
                                    },
                              ]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item label=" Giảm giá " name="discount" rules={[

                                    ({ getFieldValue }) => ({
                                          validator(_, value) {
                                                const intValue = parseInt(value, 10);
                                                return (!isNaN(intValue) && Number.isInteger(intValue) && intValue >= 0 && intValue <= 70)
                                                      ? Promise.resolve()
                                                      : Promise.reject(new Error('Vui lòng nhập số không âm và không lớn hơn 70'));
                                          },
                                    }),
                              ]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item label="Số lượng" name="count" rules={[

                                    { required: true, message: 'Vui lòng nhập số lượng mã giảm giá  ' },
                                    ({ getFieldValue }) => ({
                                          validator(_, value) {
                                                const intValue = parseInt(value, 10);
                                                return (!isNaN(intValue) && intValue >= 0 && intValue <= 100)
                                                      ? Promise.resolve()
                                                      : Promise.reject(new Error('Vui lòng nhập số không âm và không lớn hơn 100'));
                                          },
                                    }),

                              ]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item label="Giá tối thiểu" name="maxAmount" rules={[
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
                              ]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item label="Ngày tạo" name="createdDate" rules={[
                                    { required: true, message: 'Vui lòng nhập ngày tạo' }
                              ]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item label="Ngày kết" name="endDate" rules={[
                                    { required: true, message: 'Vui lòng nhập ngày kết thúc' }
                              ]}>
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

export default UpdateSale;