import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import type { RadioChangeEvent } from 'antd';
import { Radio, Rate, Tabs, message } from 'antd';
import { TabsPosition } from 'antd/es/tabs';
import RelatedProducts from '@/components/ui/RelatedProduct';
import Breadcrumbs1 from '@/components/breadcrumbs/index1';
import Comment from '../comment/Comment';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/services/product';
import { useAppDispatch } from '@/store/hook';
import { addToCart } from '@/slices/cart';
import { useMeQuery } from '@/services/auth';
import Loading from '@/components/ui/Loading';
import { da } from 'date-fns/locale';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ProductDetail = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { data, isLoading } = useGetProductByIdQuery(id!);
    const { data: authData } = useMeQuery();
    const [mode, setMode] = useState<TabsPosition>('top');
    const [value, setValue] = useState(3);
    const [color, setColor] = useState(data?.colorId![0]?.name);
    const [size, setSize] = useState(data?.sizeId![0]?.name);
    const [quantity, setQuantity] = useState<number>(1);

    const hasSale = data?.price! - (data?.price! * data?.sale_off!) / 100;
    const myCategoryId = data?.categoryId?._id;
    useEffect(() => {
        setColor(data?.colorId![0]?.name);
        setSize(data?.sizeId![0]?.name);
    }, [data]);

    const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
        setColor(value);
    };

    const handleModeChange = (e: RadioChangeEvent) => {
        setMode(e.target.value);
    };

    return (
        <section className="py-4 font-poppins dark:bg-gray-800">
            <div className="w-full px-8 h-2 pb-10">
                <Breadcrumbs1 />
            </div>

            {isLoading ? (
                <div className="h-screen">
                    <Loading />
                </div>
            ) : (
                <div>
                    {data && (
                        <div>
                            <div className=" max-w-5xl px-4 mx-auto">
                                <div className="flex flex-wrap mb-24 -mx-4">
                                    <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                        <div className="sticky top-0 overflow-hidden ">
                                            <Carousel autoPlay>
                                                {data?.images?.map((item, index) => (
                                                    <div key={index} className="h-[500px]">
                                                        <img
                                                            className="rounded-lg object-cover"
                                                            alt={item}
                                                            src={item}
                                                        />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 md:w-1/2">
                                        <div className="lg:pl-20">
                                            <div className="mb-6 ">
                                                <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                                    {data?.categoryId?.name}
                                                </span>
                                                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                                    {data?.name}{' '}
                                                    {data?.inStock === 0 ? (
                                                        <span className="!text-primary"> - (Hết hàng)</span>
                                                    ) : (
                                                        <span className="mb-2 text-base font-normal">
                                                            <span className="">
                                                                - Hiện còn:{' '}
                                                                <span className="!text-primary font-semibold">
                                                                    ({data.inStock})
                                                                </span>
                                                            </span>
                                                        </span>
                                                    )}
                                                </h2>
                                                <div className="flex flex-wrap items-center mb-6">
                                                    <span>
                                                        <Rate tooltips={desc} onChange={setValue} value={value} />
                                                        {value ? (
                                                            <span className="ant-rate-text">{desc[value - 1]}</span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </span>
                                                    <div><button className=' bg-layer text-center h-7 w-36'>Mã giảm giá </button>
                                                    </div>
                                                </div>
                                                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                                    ${hasSale}
                                                    <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                                                        <span>$.{data?.price}</span>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-8">
                                                <h2 className="w-22 mr-6 text-xl font-semibold dark:text-gray-400 ">
                                                    Màu Sắc:
                                                </h2>
                                                <div className="flex flex-wrap -mx-2 -mb-2">
                                                    <Radio.Group onChange={onChange3} value={color} optionType="button">
                                                        {data?.colorId?.map((color) => (
                                                            <Radio key={color?._id} value={color?.name}>
                                                                {color?.name}
                                                            </Radio>
                                                        ))}
                                                    </Radio.Group>
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-8">
                                                <h2 className="w-25 text-xl font-semibold dark:text-gray-400 flex">
                                                    Kích Cỡ:
                                                </h2>
                                                <div className="flex-1 flex-wrap mx-2 -mb-2">
                                                    <Radio.Group
                                                        onChange={(e) => setSize(e.target.value)}
                                                        value={size}
                                                        optionType="button"
                                                    >
                                                        {data?.sizeId?.map((size) => (
                                                            <Radio key={size?._id} value={size?.name}>
                                                                {size?.name}
                                                            </Radio>
                                                        ))}
                                                    </Radio.Group>
                                                </div>
                                            </div>
                                            <div className="w-32 mb-8 ">
                                                <label className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">
                                                    Số Lượng :
                                                </label>
                                                <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                                    <button
                                                        onClick={() => setQuantity(quantity - 1)}
                                                        className="w-20 h-full text-gray-600 border rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400"
                                                        disabled={quantity === 1}
                                                    >
                                                        <span className="m-auto text-2xl font-thin">-</span>
                                                    </button>
                                                    <input
                                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                                        type="number"
                                                        min="1"
                                                        value={quantity}
                                                        className="flex items-center w-full border font-semibold text-center text-gray-700 placeholder-gray-700 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                                    />
                                                    <button
                                                        onClick={() => setQuantity(quantity + 1)}
                                                        className="w-20 h-full text-gray-600 border rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400"
                                                    >
                                                        <span className="m-auto text-2xl font-thin">+</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 mb-6">
                                                <button
                                                    onClick={() => {
                                                        if (data.inStock === 0) {
                                                            message.warning('Sản phẩm đã hết hàng');
                                                        } else if (data.inStock < quantity) {
                                                            message.error('Hàng trong kho không đủ');
                                                        } else {
                                                            dispatch(
                                                                addToCart({
                                                                    ...(data! as any),
                                                                    price: hasSale,
                                                                    quantity: quantity,
                                                                    color: color,
                                                                    size: size,
                                                                }),
                                                            );
                                                        }
                                                    }}
                                                    className="w-full px-4 py-3 text-center text-gray-100 bg-primary/90 border border-transparent dark:border-gray-700 hover:border-primary/95 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                                                >
                                                    Thêm Vào Giỏ Hàng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-5xl px-4 mx-auto">
                                <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                                    <Radio.Button value="top">Ngang</Radio.Button>
                                    <Radio.Button value="left">Dọc</Radio.Button>
                                </Radio.Group>
                                <Tabs
                                    defaultActiveKey="1"
                                    tabPosition={mode}
                                    style={{ height: 320, fontSize: 16 }}
                                    items={[
                                        {
                                            label: `Mô tả`,
                                            key: 'a',
                                            children: `
                            ${data?.description}
                            `,
                                        },
                                        {
                                            label: `Chức năng sản phẩm`,
                                            key: 'b',
                                            children: `Condof tab`,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="p-4 mx-auto">
                <RelatedProducts categoryId={myCategoryId} />
            </div>
            <div className="p-4 mx-auto">
                <Comment comments={data?.comments!} userId={authData?._id} productId={data?._id} />
            </div>
        </section>
    );
};

export default ProductDetail;
