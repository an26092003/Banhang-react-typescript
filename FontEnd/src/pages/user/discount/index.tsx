import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
     key: React.Key;
     name: string;
     age: number;
}

const Discount_code = () => {
     const columns: ColumnsType<DataType> = [
          {
               title: 'Code mã',
               dataIndex: 'name',
               onFilter: (value: string, record) => record.name.indexOf(value) === 0,
               sorter: (a, b) => a.name.length - b.name.length,
               sortDirections: ['descend'],
          },
          {
               title: 'Ngày bẳt đầu ',
               dataIndex: 'age',
               defaultSortOrder: 'descend',
               sorter: (a, b) => a.age - b.age,
          },
          {
               title: 'Ngày kết thúc ',
               dataIndex: 'age',
               defaultSortOrder: 'descend',
               sorter: (a, b) => a.age - b.age,
          },
     ];
     const data = [
          {
               key: '1',
               name: 'John Brown',
               age: 32,
          },
          {
               key: '2',
               name: 'Jim Green',
               age: 42,
          },
          {
               key: '3',
               name: 'Joe Black',
               age: 32,
          },
          {
               key: '4',
               name: 'Jim Red',
               age: 32,
          },
     ];

     const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
          console.log('params', pagination, filters, sorter, extra);
     };

     const pagination = {
          // Số lượng item trên mỗi trang
          pageSize: 3,
     };

     return (
          <div className=' '>
               <h1 className='  text-center text-2xl'>Thông tin mã giản giá </h1>
               <Table className='py-4' columns={columns} dataSource={data} onChange={onChange} pagination={pagination} />
          </div>
     );
};

export default Discount_code;
