import { useState, useEffect } from 'react';
import { useGetCategoriesQuery } from "@/services/category";
import "./CategoryTest.css"

const CategoryTest = () => {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [displayedItems, setDisplayedItems] = useState(4);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDisplayedItems(4);
            } else {
                setDisplayedItems(12);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleShowMore = () => {
        setIsExpanded(true);
        setDisplayedItems(categories?.docs.length || 0);
    };

    const handleShowLess = () => {
        setIsExpanded(false);
        setDisplayedItems(4);
    };

    return (
        <div className="container_danhmuc-product max-w-7xl mx-auto">
            <div className="danhmuc_container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '23px', cursor: 'grab' }}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    categories?.docs.slice(0, displayedItems).map((category) => (
                        <div key={category._id} className="dm_swiper-slider">
                            <a href="" title={`${category.name}`}></a>
                            <div className="danhmuc_img">
                                <img src={category.img} alt="" className="" />
                                <span className='image_shadow'></span>
                            </div>

                            <div className="danhmuc_st">
                                <h3 className="text-center py-2 font-bold">{category.name}</h3>
                                <div className="text-center text-sm">+ {category.products.length} sản phẩm</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {!isLoading && window.innerWidth < 768 && categories?.docs.length > 4 && (
                <div className="text-center py-4">
                    {isExpanded ? (
                        <button onClick={handleShowLess} className='px-4 py-1 border bg-white/90 border-primary/90 hover:bg-primary/90 text-primary/90 hover:text-white rounded'>Thu gọn</button>
                    ) : (
                        <button onClick={handleShowMore} className='px-4 py-1 border bg-white/90 border-primary/90 hover:bg-primary/90 text-primary/90 hover:text-white rounded'>Xem thêm</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryTest;