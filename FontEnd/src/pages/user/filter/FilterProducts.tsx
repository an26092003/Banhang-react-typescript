import { Checkbox, List } from 'antd';
import { FunctionComponent, useState } from 'react';
import { useGetProductsQuery } from '@/services/product';
import { useGetCategoriesQuery, useGetProductsByCategoryAndBrandQuery } from '@/services/category';
import Loading from '@/components/ui/Loading';
import { useGetBrandsQuery, useGetColorsQuery } from '@/services/option';
import ReactPaginate from 'react-paginate';
import { calculatePagination } from '@/components/modal/pagination';
import ProductByid from '@/components/products/productBycategory';

interface FilterProductsProps { }

const FilterProducts: FunctionComponent<FilterProductsProps> = () => {
    const { data: productsData, isLoading } = useGetProductsQuery();
    const { data: categoriesData } = useGetCategoriesQuery();
    const { data: brands } = useGetBrandsQuery();
    const { data: colors } = useGetColorsQuery();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrandId, setSelectedBrandId] = useState<string[]>([]);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(categoryId)) {
                return prevSelectedCategories.filter((id) => id !== categoryId);
            } else {

                return [...prevSelectedCategories, categoryId];
            }
        });
    };
    const handleBrandChange = (brandId: string) => {
        setSelectedBrandId((prevSelectedBrandId) => {
            if (prevSelectedBrandId.includes(brandId) || prevSelectedBrandId === null) {
                return [] as string[]; // Trả về một mảng rỗng hoặc mảng chứa brandId tùy vào logic của bạn.
            } else {
                return [brandId];
            }
        });
    };
    // const { data: getProductBycategory } = useGetProductsByCategoriesQuery({ categoryIds: selectedCategories.join(',') });
    const { data: getProductBycategory } = useGetProductsByCategoryAndBrandQuery({
        categoryIds: selectedCategories.join(','),
        brandId: selectedBrandId.join(','),
    });

    // limit
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 8;
    const productList = productsData?.docs || [];

    const paginationOptions = {
        currentPage,
        perPage,
        totalCount: productList.length,
        data: productList,
    };

    const { pageCount, currentPageItems } = calculatePagination(paginationOptions);
    const handlePageChange = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };





    return (
        <section className="py-6 min-h-screen bg-gray-50 font-poppins dark:bg-gray-800 ">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="px-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap mx-auto mb-24">
                        <div className="w-full lg:w-1/6 lg:block">
                            <div className="bg-white text-lg p-2 shadow-sm">
                                <div className='overflow-y-auto max-h-[280px] relative'>
                                    <h1 className='sticky bg-white h-[30px] z-50 top-0 left-0'>Danh mục</h1>
                                    <List>
                                        {categoriesData?.docs.map((category) => (
                                            <List.Item key={category._id}>
                                                <Checkbox onChange={() => handleCategoryChange(category._id)}>{category.name}</Checkbox>
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>

                                <div className="mt-3 overflow-y-auto max-h-[280px]">
                                    <h1 className='sticky bg-white h-[30px] z-50 top-0 left-0'>Thương hiệu</h1>
                                    <List>
                                        {brands?.map((brand) => (
                                            <List.Item key={brand._id}>
                                                <Checkbox onChange={() => handleBrandChange(brand._id)}>{brand.name}</Checkbox>
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>


                            </div>
                        </div>
                        <div className="w-full lg:w-3/4 flex-1">
                            {selectedCategories.length || selectedBrandId.length > 0 ? (
                                // Hiển thị tất cả sản phẩm của cả hai danh mục
                                <div className={`grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4  items-center px-2`}>
                                    {getProductBycategory?.map((product) => (
                                        <div key={product._id} className="w-full mb-6">
                                            <ProductByid product={product} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Hiển thị sản phẩm theo trang hiện tại khi không có danh mục nào được chọn
                                <div className={`grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4  items-center px-2`}>
                                    {currentPageItems.map((product) => (
                                        <div key={product._id} className="w-full mb-6">
                                            <ProductByid product={product} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
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
                </div>

            )
            }
        </section >
    );
};

export default FilterProducts;
