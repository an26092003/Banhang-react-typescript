import { Avatar, Button, Image, Input, Modal, Popconfirm, Space } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import AddProduct from '../addProduct';
import UpdateProduct from '../updateProduct';
import { useGetProductsQuery, useDeleteProductMutation } from '@/services/product';
import Skeleton from 'react-loading-skeleton';
import { SearchProps } from 'antd/es/input';
import { ProductType } from '@/types/Product';
import { Link } from 'react-router-dom';
import { calculatePagination } from '@/components/modal/pagination';
import ReactPaginate from 'react-paginate';
import { formartVND } from '@/utils/formartVND';

const ListProduct: React.FC = () => {
    const { data, isLoading } = useGetProductsQuery();
    const { Search } = Input;

    const [openAdd, setOpenAdd] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [mutate] = useDeleteProductMutation();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch: SearchProps['onSearch'] = (value) => {
        setSearchValue(value);
    };
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

    const handleAddModalOpen = () => {
        setOpenAdd(true);
    };

    const handleAddModalClose = () => {
        setOpenAdd(false);
        setOpenUpdateModal(false);
    };

    const handleUpdateProduct = (productId: string) => {
        setSelectedProduct(productId);
        setOpenUpdateModal(true);
    };

    const handleUpdateComplete = () => {
        setSelectedProduct('');
        setOpenUpdateModal(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await mutate(id);
            toast.success('Xóa thành công');
        } catch (error) {
            toast.error('Xóa không thành công');
        }
    };
    useEffect(() => {
        if (searchValue) {
            const filtered = data?.docs.filter((product) =>
                product.name.toLowerCase().includes(searchValue.toLowerCase()),
            );
            setFilteredProducts(filtered || []);
        } else {
            setFilteredProducts(data?.docs || []);
        }
    }, [data, searchValue]);
    // limit
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 8; // Số sản phẩm hiển thị trên mỗi trang
    const productList = data?.docs.filter((product) => product.name.includes(searchValue)) || [];

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
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 bg-white dark:bg-gray-900 flex">
                    <div className="pr-4">
                        <Space direction="vertical">
                            <Search placeholder="input search text" onSearch={handleSearch} style={{ width: 200 }} />
                        </Space>
                    </div>
                    <Button type="primary" className="bg-primary" onClick={handleAddModalOpen}>
                        Add Product
                    </Button>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="pl-6 text-xs font-medium py-3">
                                Ảnh
                            </th>
                            <th scope="col" className="text-center text-xs font-medium py-3">
                                Tên sản phẩm
                            </th>
                            <th scope="col" className="text-center text-xs font-medium py-3">
                                Số Lượng
                            </th>
                            <th scope="col" className="text-center text-xs font-medium py-3">
                                Danh mục
                            </th>
                            <th scope="col" className="pr-4 text-center text-xs font-medium py-3">
                                Giá
                            </th>
                            <th scope="col" className="pr-40 text-center text-xs font-medium py-3">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <tbody>
                            <tr>
                                <td colSpan={7}>
                                    <Skeleton count={3} className="h-[98px]" />
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {currentPageItems.map((product) => (
                                <tr
                                    key={product._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="pl-6">
                                        <Avatar.Group maxCount={3}>
                                            {product.images && product.images[0] && (
                                                <div style={{ borderRadius: '50%' }}>
                                                    <Image
                                                        src={product.images[0]}
                                                        alt="image"
                                                        width={80}
                                                        height={80}
                                                    />
                                                </div>
                                            )}
                                        </Avatar.Group>
                                    </td>
                                    <td className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.name.slice(0, 20)}...
                                    </td>
                                    <td className="text-center py-4">
                                        {product.inStock > 0 ? product.inStock : <span className='text-red-500'>Hết hàng</span>}
                                    </td>
                                    <td className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.categoryId?.name.slice(0, 20)}...
                                    </td>
                                    <td className="pr-4 text-center py-4">{formartVND(product.price)}</td>
                                    <td className="pr-4 py-4">
                                        <Space size="middle">
                                            <Button
                                                type="dashed"
                                                className="bg-gree text-layer"
                                                onClick={() => handleUpdateProduct(product._id)}
                                            >
                                                Update
                                            </Button>

                                            <Popconfirm
                                                placement="topRight"
                                                title="Bạn Muốn Xóa ?"
                                                okText="OK"
                                                cancelText="Cancel"
                                                okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                                                onConfirm={() => handleDelete(product._id)}
                                            >
                                                <Button type="link" className="bg-reds text-layer">
                                                    Delete
                                                </Button>
                                            </Popconfirm>

                                            <Button type="primary" className="bg-primary">
                                                <Link to={`${product._id}/comments`} className="bg-primary">
                                                    Comment
                                                </Link>
                                            </Button>
                                        </Space>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                    <div className="mt-4 p-3 d-flex justify-content-start align-items-start">
                        <ReactPaginate
                            previousLabel={'Quay lại'}
                            nextLabel={'Tiếp theo'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination flex justify-center gap-1 text-xs font-medium'}
                            activeClassName={
                                'block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-blue-500'
                            }
                            pageClassName={
                                'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'
                            }
                            previousClassName={
                                'inline-flex  w-[60px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
                            }
                            nextClassName={
                                'inline-flex  w-[70px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
                            }
                            previousLinkClassName={'h-8 p-1 leading-6 '}
                            nextLinkClassName={'h-8 p-1 leading-6 '}
                            breakClassName={
                                'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'
                            }
                        />
                    </div>
                </table>
            </div>

            <Modal
                title="Add Product"
                open={openAdd}
                onCancel={handleAddModalClose}
                footer={null}
                destroyOnClose={true}
                width={900}
                style={{ maxWidth: 900 }}
                centered
            >
                <AddProduct handleModalClose={handleAddModalClose} />
            </Modal>

            <Modal
                title="Cập nhật sản phẩm"
                open={openUpdateModal}
                onCancel={handleUpdateComplete}
                footer={null}
                destroyOnClose={true}
                width={900}
                style={{ maxWidth: 900 }}
                centered
            >
                {selectedProduct && (
                    <UpdateProduct productId={selectedProduct} handleUpdateProduct={handleUpdateComplete} />
                )}
            </Modal>
        </>
    );
};

export default ListProduct;
