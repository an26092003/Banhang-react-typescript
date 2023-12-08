import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';

const Discount_code = () => {
     const [savedAddSales, setSavedAddSales] = useState([]);
     const [pagination, setPagination] = useState({ pageSize: 5, current: 1 });
     const [selectedSale, setSelectedSale] = useState(null);
     const [modalVisible, setModalVisible] = useState(false);

     useEffect(() => {
          const storedAddSales = JSON.parse(localStorage.getItem('selectedDiscounts')) || [];
          const currentTime = new Date().getTime();
          const updatedAddSales = storedAddSales.map((sale) => {
               const { startDate, endDate } = sale;
               const saleEndTime = new Date(endDate).getTime();
               const remainingTime = saleEndTime - currentTime;
               const remainingDays = remainingTime > 0 ? Math.floor(remainingTime / (1000 * 3600 * 24)) : 0;
               const expired = remainingTime <= 0;

               return {
                    ...sale,
                    remainingDays,
                    expired,
                    remainingTime, 
               };
          });

          setSavedAddSales(updatedAddSales);
     }, []);


     const formatDate = (timestamp) => {
          const date = new Date(timestamp);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
     };

     const handleRemoveAddSale = (index) => {
          const updatedAddSales = [...savedAddSales];
          updatedAddSales.splice(index, 1);
          setSavedAddSales(updatedAddSales);
          localStorage.setItem('selectedDiscounts', JSON.stringify(updatedAddSales));
     };
     // hàm xóa 
     const columns = [
          {
               title: 'Mã code',
               dataIndex: 'code',
               key: 'code',
          },
          {
               title: 'Phần trăm giảm giá (%)',
               dataIndex: 'discount',
               key: 'discount',
          },
          {
               title: 'Giới hạn tiền tối đa(VnD)',
               dataIndex: 'maxAmount',
               key: 'maxAmount',
          },
          {
               title: 'Ngày bắt đầu',
               dataIndex: 'startDate',
               key: 'startDate',
               render: (startDate) => formatDate(startDate),
          },
          {
               title: 'Ngày kết thúc',
               dataIndex: 'endDate',
               key: 'endDate',
               render: (endDate) => formatDate(endDate),
          },
          {
               title: 'Thời gian còn lại',
               dataIndex: 'remainingDays',
               key: 'remainingDays',
               render: (text, record) => {
                    const currentDate = Date.now();
                    const endDate = new Date(record.endDate).getTime();
                    const remainingTime = endDate - currentDate;

                    if (remainingTime <= 0) {
                         return <span>Hết hạn</span>;
                    } else {
                         const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                         const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                         const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                         return (
                              <span>
                                   {remainingDays} ngày ,{hours} giờ, {minutes} phút
                              </span>
                         );
                    }
               },
          },
          {
               title: 'Trạng thái',
               dataIndex: 'status',
               key: 'status',
               render: (text, record) => {
                   const remainingTime = record.remainingTime;
                   if (remainingTime <= 0) {
                       return 'Hết hạn';
                   } else {
                       const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                       const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                       if (hours > 0 || minutes > 0) {
                           return  <span className='text-gree'>Còn hạn</span>;
                       } else {
                           return <span className='text-red'>Hết hạn </span>;
                       }
                   }
               },
           },
           {
               title: 'Hành động',
               dataIndex: 'action',
               key: 'action',
               render: (_, record, index) => (
                   <div>
                       <Button className='mx-2'> <a href={`/checkout`}> Dùng Mã </a></Button>
                       <Button onClick={() => handleRemoveAddSale(index)}>Xóa</Button>
                      
                   </div>
               ),
           }
           
     ];
     const handleTableRowClick = (record) => {
          setSelectedSale(record);
          setModalVisible(true);
     };

     const handleTableChange = (pagination) => {
          setPagination(pagination);
     };

     return (
          <div>
               <div className='my-4'>
                    <h1 className='text-2xl'>Các mã giảm giá đã lưu </h1>
                    <Table
                         className='py-5'
                         dataSource={savedAddSales.map((sale, index) => ({
                              ...sale,
                              key: sale.code,
                              action: index, 
                          }))}                          
                         columns={columns}
                         pagination={pagination}
                         onChange={handleTableChange}
                         onRow={(record) => ({
                              onClick: () => {
                                   handleTableRowClick(record);
                              },
                         })}
                    />
                    <Modal
                         title='Thông tin chi tiết'
                         open={modalVisible}
                         onClose={() => setModalVisible(false)}
                         footer={[
                             <Button key='close' onClick={() => setModalVisible(false)}>
                                 Đóng
                             </Button>,
                         ]}
                    >
                         {selectedSale && (
                              <div>
                                   <p>Mã code: {selectedSale.code}</p>
                                   <p>Discount: {selectedSale.discount}</p>
                                   <p>Ngày bắt đầu: {formatDate(selectedSale.startDate)}</p>
                                   <p>Ngày kết thúc: {formatDate(selectedSale.endDate)}</p>
                                   <p>
                                        Thời gian còn lại: {selectedSale.remainingDays >= 0 ? (
                                             <>
                                                  {Math.max(Math.floor(selectedSale.remainingTime / (1000 * 60 * 60)), 0)} giờ,{' '}
                                                  {Math.max(Math.floor((selectedSale.remainingTime % (1000 * 60 * 60)) / (1000 * 60)), 0)} phút
                                             </>
                                        ) : (
                                             'Hết hạn'
                                        )}
                                   </p>
                                   <p>Trạng thái: {selectedSale.expired ? 'Hết hạn' : 'Còn hạn'}</p>

                              </div>
                         )}
                    </Modal>
               </div>
          </div>
     );
};

export default Discount_code;
