import React from 'react';
import { useMeQuery } from '@/services/auth';
import { Breadcrumb } from 'antd';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface BreadCrumbProps {}

const BreadCrumb: FunctionComponent<BreadCrumbProps> = () => {
  const { data: authData, isLoading } = useMeQuery();
  if (isLoading) {
    return null;
  }
  const orderId = authData?._id || '';

  return (
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-while-800">
      <ul className="space-y-2 font-medium">
        <li>
          <Link to="view_account" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">Thông tin cá nhân </span>
          </Link>
        </li>
        <li>
          <Link to={`orders/${orderId}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">Đơn hàng đã đăt</span>
          </Link>
        </li>
        <li>
          <Link to="favourite" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">Sản phẩm yêu thích</span>
          </Link>
        </li>
        <li>
          <Link to="sale" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">Mã giảm giá</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BreadCrumb;
