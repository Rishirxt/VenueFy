import React from 'react'
import { banners } from '../../utils/constants'
import Slider from "react-slick"
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
    const settings = {
        centerMode: true,
        centerPadding: "400px",
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 800,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerPadding: "100px",
                }
            },
            {
                breakpoint: 640,
                settings: {
                    centerPadding: "0px",
                }
            }
        ]
    };

    return (
        <div className='w-full bg-white py-6 overflow-hidden'>
            <div className='mx-auto px-4'>
                <Slider {...settings}>
                    {
                        banners.map((banner, i) => (
                            <div key={i} className='px-2 cursor-pointer outline-none' onClick={() => navigate('/movies')}>
                                <img src={banner} alt={`banner-${i}`}
                                    className='w-full h-[300px] rounded-xl object-cover shadow-md hover:shadow-lg transition-shadow duration-300'
                                />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Banner