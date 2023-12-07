import { FunctionComponent } from 'react';
import { Carousel } from 'antd';

interface CarouselProps { }

const slides = [
    {
        id: 1,
        bannerUrl: 'https://file.hstatic.net/1000369857/collection/1919_730_polo_3da01ded33614497a1884a3b99489661.jpg',
        title: '',
        link: '',
    },
    {
        id: 2,
        bannerUrl: 'https://pos.nvncdn.net/b5a043-19330/art/20210401_RRhGMiO45aFfqXXlU1HaKVxT.png',
        title: '',
        link: '',
    },

    {
        id: 3,
        bannerUrl: 'https://dongphuchaianh.vn/wp-content/uploads/2021/06/banner-ao-polo-dong-phuc-cong-ty.jpg',
        title: '',
        link: '',
    },
];

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const CarouselSlide: FunctionComponent<CarouselProps> = () => {
    return (
        <div className=" max-[800px]:p-4 relative flex justify-center">

            <div className=' w-full h-[80%]'>
                <Carousel swipeToSlide={true} autoplay dotPosition="bottom" className="mx-auto">
                    {slides.map((slide) => (
                        <div
                            className="h-[520px] max-md:h-[360px] max-[400px]:h-[200px]"
                            key={slide.id}
                            style={contentStyle}
                        >
                            <img
                                className="w-full h-full object-cover "
                                src={slide.bannerUrl}
                                alt=""
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default CarouselSlide;
