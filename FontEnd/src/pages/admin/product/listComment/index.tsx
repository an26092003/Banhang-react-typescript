import { calculatePagination } from "@/components/modal/pagination";
import { useGetAllCommentsQuery, useRemoveCommentMutation } from "@/services/comment";
import { Button, Popconfirm, Skeleton, Space } from "antd";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const ListComment = () => {
  const { id: productId } = useParams();
  const { data: commentData, isLoading } = useGetAllCommentsQuery();
  const [mutate] = useRemoveCommentMutation();

  const filteredComments = commentData?.filter((comment) => comment.productId === productId);

  const handleDeleteComment = async (id: string) => {
    try {
      await mutate(id);
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Xóa không thành công');
    }
  };

  // limit
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 9; // Số sản phẩm hiển thị trên mỗi trang
  const paginationOptions = {
    currentPage,
    perPage,
    totalCount: filteredComments?.length || 0,
    data: filteredComments || [],
  };

  const { pageCount, currentPageItems } = calculatePagination(paginationOptions);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="pl-6 text-xs font-medium py-3">
              Tên người dùng
            </th>
            <th scope="col" className="pl-6 text-xs font-medium py-3">
              Bình Luận
            </th>
            <th scope="col" className="text-center text-xs font-medium py-3">
              Thời Gian
            </th>
            <th scope="col" className="text-center text-xs font-medium py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <Skeleton className="h-[98px]" />
              </td>
            </tr>
          ) : currentPageItems?.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <p className="ml-5">Không có bình luận</p>
              </td>
            </tr>
          ) : (
            currentPageItems?.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-6">
                  {item.userId.username}
                </td>
                <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-6">
                  {item.text}
                </td>
                <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="py-4 flex items-center justify-center">
                  <Space size="small">
                    <Popconfirm
                      placement="topRight"
                      title="Bạn Muốn Xóa ?"
                      okText="OK"
                      cancelText="Cancel"
                      okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                      onConfirm={() => handleDeleteComment(item._id!)}
                    >
                      <Button type="link">Delete</Button>
                    </Popconfirm>
                  </Space>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <div className='mt-4 d-flex justify-content-start align-items-start'>
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
      </table>
    </div>
  );
};

export default ListComment;