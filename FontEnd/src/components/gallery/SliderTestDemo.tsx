import React from 'react';
import "./SliderTestDemo.css"
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
const SliderTestDemo: React.FC = () => {

  return (
    <div className="smooth-scroll-wrapper">
        <div className="smooth-content">
            <section className='home_section'>
                <div className="home_video_layer"></div>
                <div className="video">
                    <ReactPlayer
                    url="https://www.youtube.com/watch?v=mQHPHGAWp6M"
                    controls
                    playing
                    loop
                    muted
                    width="100vw"
                    height="700px"
                    />
                </div>
                
                <div className="home_hero_heading">
                    <h3>Mặc trang phục đẹp giúp cho cuộc sống của chúng ta tốt đẹp hơn và yêu đời hơn</h3>
                    <Link
                        to={'/filter'}
                        
                    >
                        <button className='open_demo_btn'>Đồ Đẹp</button>
                    </Link>
                    
                </div> 
            </section>
            
        </div>
        
    </div>
  );
};

export default SliderTestDemo;