import { message } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import SaleOffCard from '../ui/SaleOffCard';
import { ProductType } from '@/types/Product';
import { useAppDispatch } from '@/store/hook';
import { addToCart } from '@/slices/cart';
import { useAddToWishlistMutation, useCheckProductInWishlistMutation, useGetWishlistQuery } from '@/services/favourite';
import { useMeQuery } from '@/services/auth';
import { toast } from 'react-toastify';
import { formartVND } from '@/utils/formartVND';
import { CloseOutlined } from '@ant-design/icons';

interface ProductItemProps {
    product?: ProductType;
}

const ProductHot: FunctionComponent<ProductItemProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const { data: authData } = useMeQuery();
    const [loading, _setLoading] = useState(false);
    const hasSale = product?.price! - (product?.price! * product?.sale_off!) / 100;

    //favourite product
    const [addToWishlist] = useAddToWishlistMutation();
    const { data: wishlistData } = useGetWishlistQuery(authData?._id || '');
    const [checkProductInWishlist] = useCheckProductInWishlistMutation();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [haveOption, setHaveOption] = useState(false);
    const [color, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');

    const handleSelect = () => {
        if (product?.sizeId?.length! > 0 || product?.colorId?.length! > 0) {
            setHaveOption(true);
        } else {
            setHaveOption(false);
            dispatch(addToCart({ ...product, quantity: 1 }));
        }
    };

    const handleClose = () => {
        setHaveOption(false);
        setColor('');
        setSize('');
    };
    console.log('product', product);

    const handleAddToWishlist = async (productId: string, _userId: any) => {
        if (authData) {
            try {
                // Kiểm tra xem người dùng đã có danh sách yêu thích hay chưa
                const wishlistResponse = await wishlistData;

                // Nếu không có danh sách yêu thích, tạo một danh sách mới
                if (
                    !wishlistResponse ||
                    !wishlistResponse.wishlist_items ||
                    wishlistResponse.wishlist_items.length === 0
                ) {
                    await addToWishlist({ product_id: productId, user_id: authData._id });
                    toast.success('Thêm sản phẩm yêu thích thành công', { position: 'top-right' });
                    setIsInWishlist(true);
                } else {
                    // Sau đó kiểm tra sản phẩm trong danh sách yêu thích
                    const response = await checkProductInWishlist({ product_id: productId, user_id: authData._id });
                    const { exists } = (response as any)?.data;

                    if (exists) {
                        toast.warning('Sản phẩm đã tồn tại trong danh sách yêu thích', { position: 'top-right' });
                    } else {
                        // Thêm sản phẩm vào danh sách yêu thích
                        await addToWishlist({ product_id: productId, user_id: authData._id });
                        toast.success('Thêm sản phẩm yêu thích thành công', { position: 'top-right' });
                        setIsInWishlist(true);
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error('Đã xảy ra lỗi khi kiểm tra hoặc thêm sản phẩm vào danh sách yêu thích', {
                    position: 'top-right',
                });
            }
        } else {
            toast.warning('Bạn chưa đăng nhập!', { position: 'top-right' });
        }
    };

    useEffect(() => {
        const checkProductInWishlistAsync = async () => {
            try {
                const response = await checkProductInWishlist({
                    product_id: product?._id!,
                    user_id: authData?._id,
                });
                const { exists } = (response as any)?.data;
                setIsInWishlist(exists);
            } catch (error) { }
        };

        if (authData) {
            checkProductInWishlistAsync();
        }
    }, [authData, product?._id]);

    return (
        <>
            {loading ? (
                <div>
                    <Skeleton className="h-[260px]" />
                    <Skeleton count={4} />
                </div>
            ) : (
                <div className="px-2 m-0 p-4">
                    <div className="relative group bg-white rounded shadow-md ">
                        <div className="favourite hidden group-hover:block flex-col ">
                            {!isInWishlist && (
                                <div
                                    onClick={() => handleAddToWishlist(product?._id!, authData?._id)}
                                    className="absolute left-5 top-5 z-10 text-xl font-semibold flex items-center justify-center p-2 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 "
                                >
                                    <AiOutlineHeart />
                                </div>
                            )}
                            <div
                                onClick={handleSelect}
                                className="absolute left-5 top-10 z-10 text-xl font-semibold flex items-center justify-center p-2 mt-8 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11"
                            >
                                <AiOutlineShoppingCart />
                            </div>
                        </div>
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <Link to={`/detail/${product?._id}`} className="">
                                <img
                                    src={product?.images[0]}
                                    alt={product?.name}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </Link>
                        </div>

                        {/* Card sale off if saleoff > 0 */}
                        <SaleOffCard type="saleoff" off={product?.sale_off} />

                        {haveOption && (
                            <div>
                                <div
                                    className={`absolute group top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/90 z-50`}
                                >
                                    <button className="absolute top-2 right-2 hover:opacity-70" onClick={handleClose}>
                                        <CloseOutlined />
                                        <span className="ml-1">Đóng</span>
                                    </button>
                                    <div className="flex flex-col w-full gap-y-2 px-3">
                                        {product?.sizeId && (
                                            <select
                                                onChange={(e) => setSize(e.target.value)}
                                                className="w-full shadow text-center text-nav group px-2 py-2 outline-none"
                                            >
                                                <option value="">-- Vui lòng chọn size --</option>
                                                {product.sizeId.map((size) => (
                                                    <option key={size._id} value={size.name}>
                                                        {size.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}

                                        {product?.colorId && (
                                            <select
                                                onChange={(e) => setColor(e.target.value)}
                                                className="w-full shadow text-center text-nav group px-2 py-2 outline-none"
                                            >
                                                <option value="">-- Vui lòng chọn màu --</option>

                                                {product?.colorId?.map((color) => (
                                                    <option key={color._id} value={color.name}>
                                                        {color.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (color.length > 0 && size.length > 0) {
                                                setColor('');
                                                setSize('');
                                                handleClose();

                                                if (product?.inStock === 0) {
                                                    message.warning('Sản phẩm đã hết hàng');
                                                } else {
                                                    dispatch(addToCart({ ...product, quantity: 1, color, size }));
                                                }
                                            } else {
                                                message.info('Hãy hoàn tất lựa chọn của bạn');
                                            }
                                        }}
                                        className="absolute bottom-0 w-full uppercase font-semibold text-white !bg-primary py-3"
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="py-4 text-left">
                        <h3 className="text-left mt-0 h-[50px] text-sm lg:text-base line-clamp-2 font-normal">
                            <Link to={`/detail/${product?._id!}`}>{product?.name}</Link>
                        </h3>
                        <p className="my-3 text-lg font-medium text-left text-gray-600">
                            <span className="text-red-500 dark:text-gray-300 text-xs lg:text-xl">
                                {formartVND(hasSale)}
                            </span>
                            {product?.sale_off! > 0 && (
                                <span className="ml-2 text-gray-400 line-through ttext-xs lg:text-xl">
                                    {formartVND(product?.price!)}
                                </span>
                            )}
                        </p>

                    </div>
                </div>
            )}
        </>
    );
};

export default ProductHot;
