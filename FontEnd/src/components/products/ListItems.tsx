import { ProductType } from '@/types/Product';
import { FunctionComponent, useState } from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '@/services/product';
import Skeleton from 'react-loading-skeleton';
import './ListItems.css'
interface ListProductItemsProps {
    heading?: string;
    hostProducts?: ProductType[];
}

const ListProductItems: FunctionComponent<ListProductItemsProps> = ({ heading }) => {
    const { data: dataProduct, isLoading } = useGetProductsQuery();
    //limit
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 8; // Số sản phẩm hiển thị trên mỗi trang
    const offset = currentPage * perPage;
    const currentPageItems = dataProduct?.docs.slice(offset, offset + perPage);
    return (
        <section className="flex items-center font-poppins section_danhmuc">
            <div className="flex-1 max-w-6xl px-0 py-4 mx-auto grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                    <div className="grid gap-3 mb-11 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {currentPageItems.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                )}

                <div className="flex justify-center">
                    <Link
                        to={'/filter'}
                        className="px-4 py-1 border bg-white/90 border-primary/90 hover:bg-primary/90 text-primary/90 hover:text-white rounded"
                    >
                        Xem thêm
                    </Link>
                </div>
            </div>
        </section>



    );
};

export default ListProductItems;
