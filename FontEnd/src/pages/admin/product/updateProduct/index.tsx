import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Select, Tag, message } from 'antd';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/services/product';
import { useGetCategoriesQuery } from '@/services/category';
import { toast } from 'react-toastify';
import { useGetColorsQuery, useGetSizesQuery } from '@/services/option';
import UploadFileServer from '@/components/uploads/UploadFile';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useGetBrandsQuery } from '@/services/brand';

type SizeType = Parameters<typeof Form>[0]['size'];

const UpdateProduct: React.FC<{ productId: string; handleUpdateProduct: () => void }> = ({
    productId,
    handleUpdateProduct,
}) => {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const { data: currentProduct } = useGetProductByIdQuery(productId);

    const { TextArea } = Input;
    const [form] = Form.useForm();

    const { data: categoryData } = useGetCategoriesQuery();
    const { data: colors } = useGetColorsQuery();
    const { data: sizes } = useGetSizesQuery();
    const { data: branddata } = useGetBrandsQuery();
    const brands = branddata?.docs || [];
    const categories = categoryData?.docs || [];
    const [isLoading, setIsLoading] = useState(false);
    const [update] = useUpdateProductMutation();

    const [images, setImages] = useState<string[]>(currentProduct?.images!);
    const [colorId, setColorId] = useState<string[]>([]);
    const [sizeId, setSizeId] = useState<string[]>([]);

    const handleChangeColor = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setColorId((prev) => [...prev, e.target.value]);
        } else {
            setColorId((prev) => [...prev.filter((item) => item !== e.target.value)]);
        }
    };

    const hanldeChangeSizes = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setSizeId((prev) => [...prev, e.target.value]);
        } else {
            setSizeId((prev) => [...prev.filter((item) => item !== e.target.value)]);
        }
    };

    const onFinish = async (values: any) => {
        try {
            setIsLoading(true);

            if (sizeId.length === 0) {
                message.warning('Vui lòng chọn size');
                return;
            }

            if (colorId.length === 0) {
                message.warning('Vui lòng chọn màu');
                return;
            }

            await update({
                productId,
                updatedProduct: {
                    ...currentProduct,
                    ...values,
                    colorId,
                    sizeId,
                    images,
                },
            });
            toast.success('Cập nhật sản phẩm thành công');
            handleUpdateProduct();
        } catch (error) {
            toast.error('Cập nhật sản phẩm không thành công');
        } finally {
            setIsLoading(false);
        }
    };

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        if (currentProduct) {
            form.setFieldsValue({
                name: currentProduct.name,
                price: currentProduct.price,
                sale_off: currentProduct.sale_off,
                inStock: currentProduct.inStock,
                description: currentProduct.description,
                categoryId: currentProduct.categoryId?._id,
                brandId: currentProduct.brandId?._id,
                colorId: [],
                sizeId: [],
            });
            setImages(currentProduct?.images!)
        }
    }, [currentProduct, form]);



    return (
        <>
            {currentProduct ? (
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                    onFinish={onFinish}
                    initialValues={{
                        size: componentSize,
                    }}
                >
                    <Form.Item label="Form Size" name="size">
                        <Radio.Group>
                            <Radio.Button value="small">Small</Radio.Button>
                            <Radio.Button value="default">Default</Radio.Button>
                            <Radio.Button value="large">Large</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: 'Tên sản phẩm là cần thiết!',
                            },
                        ]}
                    >
                        <Input placeholder="Vui lòng nhập tên sản phẩm" style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá (VNĐ * 1000)"
                        rules={[
                            {
                                required: true,
                                message: 'Giá là cần thiết!',
                            },
                        ]}
                    >
                        <InputNumber placeholder="Vui lòng gõ giá" style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item name="sale_off" label="Giá sale">
                        <InputNumber placeholder="Vui lòng gõ sale" style={{ width: '100%' }} min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng trong kho"
                        name="inStock"
                        rules={[
                            {
                                required: true,
                                message: 'Số lượng là cần thiết!',
                            },
                        ]}
                    >
                        <InputNumber placeholder="Số lượng" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[
                            {
                                required: true,
                                message: 'Mô tảf là cần thiết!',
                            },
                        ]}
                    >
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{ height: 120, marginBottom: 24 }}
                            placeholder="Mô tả sản phẩm"
                        />
                    </Form.Item>

                    {/* Option start */}

                    <Form.Item label="Chọn màu" rules={[{ required: true, message: 'Vui lòng chọn màu' }]}>
                        {currentProduct.colorId?.map((color) => (
                            <Tag className="my-2" key={color._id} closeIcon>
                                {color.name}
                            </Tag>
                        ))}
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                {colors?.docs.map((color) => (
                                    <Col key={color._id} span={8}>
                                        <Checkbox onChange={(e) => handleChangeColor(e)} value={color._id}>
                                            {color.name}
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label="Chọn sizes" rules={[{ required: true, message: 'Vui lòng chọn size' }]}>
                        {currentProduct.sizeId?.map((size) => (
                            <Tag className="my-2" key={size._id} closeIcon>
                                {size.name}
                            </Tag>
                        ))}
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                {sizes?.docs.map((size) => (
                                    <Col key={size._id} span={8}>
                                        <Checkbox onChange={(e) => hanldeChangeSizes(e)} value={size._id}>
                                            {size.name}
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                   
                    <Form.Item
                        name="brandId"
                        label="brand"
                        rules={[
                            {
                                required: true,
                                message: 'brand is required!',
                            },
                        ]}
                    >
                        <Select placeholder="Select a brand" optionFilterProp="children">
                            {brands.map((brand) => (
                                <Select.Option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {/* Option end */}
                    <Form.Item
                        name="categoryId"
                        label="Category"
                        rules={[
                            {
                                required: true,
                                message: 'Category is required!',
                            },
                        ]}
                    >
                        <Select placeholder="Select a category" optionFilterProp="children">
                            {categories.map((category) => (
                                <Select.Option key={category._id} value={category._id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Thêm ảnh">
                        <UploadFileServer images={images!} setImages={setImages} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                        <Button type="primary" className="bg-primary" htmlType="submit" loading={isLoading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <div>Loading product ...</div>
            )}
        </>
    );
};

export default UpdateProduct;
