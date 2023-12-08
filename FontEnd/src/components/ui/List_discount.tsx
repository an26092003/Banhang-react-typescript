import { useEffect, useState } from 'react';
import { useGetDiscountsQuery, useApplyDiscountMutation } from '@/services/discount';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import { formartVND } from '@/utils/formartVND';
import "./List_discount.css"
import { Link } from 'react-router-dom';

const List_discount = () => {
    const { data: discountsData, isLoading, isError } = useGetDiscountsQuery();
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);

    const [applyDiscountMutation] = useApplyDiscountMutation();
    const addSale = async (discount) => {
        const confirmAdd = window.confirm('Bạn có muốn thêm  mã ưu đãi này vào danh sách đã chọn không?');
        if (confirmAdd) {
            try {
                const result = await applyDiscountMutation(discount._id);
                setSelectedDiscounts([...selectedDiscounts, discount]);
                toast.success(`Đã thêm ưu đãi: ${discount.discount}`, {
                    position: 'bottom-right',
                });
                return result
            } catch (error) {
                console.error('Lỗi khi áp dụng mã giảm giá:', error);
                toast.error('Có lỗi xảy ra khi thêm ưu đãi!', {
                    position: 'bottom-right',
                });
            }
        }
    };
    useEffect(() => {
        localStorage.setItem('selectedDiscounts', JSON.stringify(selectedDiscounts));
    }, [selectedDiscounts]);

    useEffect(() => {
        const storedSelectedDiscounts = localStorage.getItem('selectedDiscounts');
        if (storedSelectedDiscounts) {
            setSelectedDiscounts(JSON.parse(storedSelectedDiscounts));
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error fetching discounts</div>;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
      };
    return (
        <div>
            {discountsData ? (
                <div className='max-w-5xl px-2 lg:px-4 w-full mx-auto '>
                    <div className=' flex justify-between'>
                        <h2 className='text-2xl my-3'>Các mã giảm giá có trong của hàng </h2>
                        {/* <button className='btn__background--liner'><a href="/">Sản phẩn </a></button> */}
                        <Link to='/'>
                            <button className="btn__background--liner mt-5 mb-5" type="button">

                                <strong>Sản phẩm</strong>
                                <div id="container-stars">
                                    <div id="stars"></div>
                                </div>

                                <div id="glow">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                                
                            </button>
                        </Link>
                        
                    
                    </div>
                    
                    {discountsData.docs.length > 0 ? (
                        <div className='grid grid-cols-4 gap-4 rounded-md'>
                        {discountsData.docs.map((discount) => (
                            <div className='back__box--test' key={discount._id}>
                                <button className='' onClick={() => addSale(discount)}>
                                    <p className=''>Giá trị giảm giá: {discount.discount}%</p>
                                    <p className=''>Đơn hàng tối thiểu: {formartVND(discount.maxAmount)}</p>
                                    <p>HSD: {formatDate(discount.startDate)}-{formatDate(discount.endDate)}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                    ) : (
                        <div>  Không có mã giảm giá </div>
                    )}
                </div>
            ) : (
                <div>404</div>
            )}
        </div>
    );
};
export default List_discount;
