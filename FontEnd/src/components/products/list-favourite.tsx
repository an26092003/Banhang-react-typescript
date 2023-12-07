import { ProductType } from '@/types/Product';
import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useGetWishlistQuery, useRemoveProductFromWishlistMutation } from '@/services/favourite';
import { useMeQuery } from '@/services/auth';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SaleOffCard from '../ui/SaleOffCard';
import { toast } from 'react-toastify';
import { Rate } from 'antd';
import { CiCircleRemove } from 'react-icons/ci';
import { addToCart } from '@/slices/cart';
import { useAppDispatch } from '@/store/hook';
import ReactPaginate from 'react-paginate';

interface ListProductItemsProps {
    heading?: string;
    hostProducts?: ProductType[];
}

const ListYourFavourite: FunctionComponent<ListProductItemsProps> = ({ heading }) => {
    const { data: authData } = useMeQuery();
    const dispatch = useAppDispatch();

    const user_id = authData?._id || '';
    const { data, isLoading } = useGetWishlistQuery(user_id);
    const [mutate] = useRemoveProductFromWishlistMutation();
    const wishlistItems = data?.wishlist_items || [];

    // const hasSale = (wishlistItems?.price!) - ((wishlistItems?.price! * wishlistItems?.sale_off!) / 100);
    const calculateDiscountedPrice = (price: number, saleOff: number) => {
        return price - (price * saleOff) / 100;
    };


    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [value, setValue] = useState(3);
    //limit
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 8; // Số sản phẩm hiển thị trên mỗi trang

    const handlePageChange = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };

    const pageCount = Math.ceil(wishlistItems.length / perPage);
    const offset = currentPage * perPage;
    const currentPageItems = wishlistItems.slice(offset, offset + perPage);

    const handleDelete = async (id: string) => {
        try {
            await mutate({ user_id, product_id: id });
            toast.success('Xóa thành công');
        } catch (error) {
            toast.error('Xóa không thành công');
        }
    };



    return (
        <section className="flex items-center font-poppins">
            <div className="justify-center flex-1 max-w-6xl px-0 py-4 mx-auto lg:py-8 md:px-4">
                <h2 className="pb-2 uppercase text-xl font-semibold text-left text-gray-800 md:text-3xl dark:text-gray-400">
                    {heading}
                </h2>
                <div className="w-20 mb-6 border-b border-red-700 dark:border-gray-400"></div>
                {isLoading ? (
                    <div className="grid gap-4 mb-11 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {[...new Array(8)].map((_item, index) => (
                            <div key={index}>
                                <Skeleton className="h-[170px] w-full" />
                                <Skeleton count={3} className="h-[42px]" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-4 mb-11 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
                        {currentPageItems.map((item: any) => (
                            <div className="shadow-sm">
                                <div className="relative group ">

                                    <div className="favourite hidden group-hover:block ">
                                        <div
                                            onClick={() => handleDelete(item.product_id._id)}
                                            className="absolute left-0 z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 "
                                        >
                                            <CiCircleRemove />
                                        </div>
                                    </div>
                                    <Link to={`/detail/${item.product_id?._id}`} className="">
                                        <img
                                            src={item.product_id?.images[0]}
                                            alt={item.product_id?.name}
                                            className="object-cover w-full mx-auto h-40 md:h-80 lg:h-60"
                                        />
                                    </Link>

                                    {/* Card sale off if saleoff > 0 */}
                                    <SaleOffCard type="saleoff" off={item.product_id?.sale_off} />

                                    <div className="flex justify-center">
                                        <div
                                            onClick={() =>
                                                dispatch(
                                                    addToCart({
                                                        ...item.product_id!,
                                                        quantity: 1,
                                                        colorId: item.product_id?.colorId![0].name as any,
                                                        sizeId: item.product_id?.sizeId![0].name as any,
                                                    }),
                                                )
                                            }
                                            className="absolute z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 "
                                        >
                                            <AiOutlineShoppingCart />
                                        </div>
                                    </div>

                                </div>
                                <div className="py-6">
                                    <h3 className="mb-3 text-sm lg:text-base line-clamp-2 font-normal px-3">
                                        <Link to={`/detail/${item.product_id?._id!}`}>{item.product_id?.name}</Link>
                                    </h3>
                                    <p className="mb-3 text-lg font-medium text-center text-gray-600">
                                        <span className="text-primary/90 dark:text-gray-300 text-sm lg:text-xl">
                                            ${item.product_id?.price}
                                        </span>
                                        {item.product_id?.sale_off! > 0 && (
                                            <span className="ml-2 text-gray-400 line-through text-sm lg:text-xl">
                                                ${calculateDiscountedPrice(item.product_id?.price, item.product_id?.sale_off)}
                                            </span>
                                        )}
                                    </p>
                                    <div className="flex justify-center">
                                        <span>
                                            <Rate className="text-sm" tooltips={desc} onChange={setValue} value={value} />
                                        </span>
                                    </div>
                                </div>

                            </div>

                        ))}




                    </div>
                )}

                <ReactPaginate
                    previousLabel={'Quay lại'}
                    nextLabel={'Tiếp theo'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination flex justify-center gap-1 text-xs font-medium'}
                    activeClassName={'block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-blue-500'}
                    pageClassName={'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'}
                    previousClassName={'inline-flex  w-[60px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'}
                    nextClassName={'inline-flex  w-[70px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'}
                    previousLinkClassName={'h-8 p-1 leading-6 '}
                    nextLinkClassName={'h-8 p-1 leading-6 '}
                    breakClassName={'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'}
                />
            </div>

        </section>

    );
};

export default ListYourFavourite;




