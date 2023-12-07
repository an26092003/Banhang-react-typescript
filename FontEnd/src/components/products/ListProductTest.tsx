import { ProductType } from '@/types/Product';
import { FunctionComponent, useRef, useState } from 'react';
// import './ListItems.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useGetProductsHotQuery } from '@/services/product';
import ProductHot from './productHot';
interface ListProductTestProps {
    heading?: string;
    hostProducts?: ProductType[];
}

const ListProductHot: FunctionComponent<ListProductTestProps> = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<Slider | null>(null); // Thêm useRef để có thể truy cập Slider instance
    const { data: products } = useGetProductsHotQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // Kích thước màn hình cho iPad hoặc các màn hình lớn hơn
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, // Kích thước màn hình cho điện thoại
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
            setCurrentSlide((prevSlide) => prevSlide + 1);
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
            setCurrentSlide((prevSlide) => prevSlide - 1);
        }
    };

    return (

        <section className="container mx-auto max-w-2xl py-5 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 background__product ">
            <h2 className="pb-2 uppercase text-xl font-semibold text-left text-gray-800 md:text-3xl dark:text-gray-400">
                Top sản phẩm bán chạy
            </h2>
            <div className="w-48 mb-6 border-b border-red-700 dark:border-gray-400"></div>
            <div className="test_1 py-10 relative ">
                <Slider ref={sliderRef} {...settings} initialSlide={currentSlide}>
                    {products?.data.map((product) => (
                        <ProductHot key={product._id} product={product._id} />


                    ))}
                </Slider>
                <div className="absolute top-0 right-0 flex justify-between items-center mt-4 mr-4">
                    <button onClick={prevSlide} className="text-gray-500 dark:text-gray-400 mr-2">
                        <GrLinkPrevious />
                    </button>
                    <button onClick={nextSlide} className="text-gray-500 dark:text-gray-400">
                        <GrLinkNext />
                    </button>
                </div>
            </div>
        </section>


    );
};

export default ListProductHot;
