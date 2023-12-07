import { useGetCatgoryByIdQuery } from "@/services/category";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
interface RelatedProductsProps {
    categoryId: string | undefined;
}

const RelatedProducts: React.FC<{ categoryId: RelatedProductsProps }> = ({ categoryId }) => {
    const { data: productData } = useGetCatgoryByIdQuery(categoryId);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        // <div className="py-10 mx-auto px-4">
        //     <h2 className="pb-6 px-4 font-bold">Sản phẩm cùng loại</h2>
        //     <Slider {...settings}>
        //         {productData?.products.map((item) => (
        //             <Link to={`/detail/${item?._id}`}>
        //                 <img key={item._id} src={item.images[0]} className="w-[300px] object-cover h-[350px] px-2 py-2" />
        //                 <p>{item.name}</p>
        //             </Link>
        //         ))}

        //     </Slider>
        // </div>
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sản phẩm cùng loại</h2>

                <div className="mt-6 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <Slider {...settings}>
                        {productData?.products.map((item) => (
                            <div key={item._id} className="group relative p-3">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <Link to={`/detail/${item._id}`}>
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </Link>
                                </div>
                                <div className="mt-4 flex justify-between p-2">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link to={`/detail/${item._id}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {item.name}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{item.categoryId?.name}</p>
                                    </div>
                                    <p className="text-base decoration-solid  text-gray-900"><span className=" text-base line-through font-medium">{item.sale_off}$-</span>{item.price}$</p>


                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        </div>



    );
};

export default RelatedProducts;
