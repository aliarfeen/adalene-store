
import { Carousel } from "flowbite-react";

import { Button } from "../Common/Button";

import "./slider.css"

import bag3 from '../../assets/HomeImage/bag3.avif'
import bag4 from '../../assets/HomeImage/allProduct6.jpg'
import bag5 from '../../assets/HomeImage/allProduct4.jpg'
import bag6 from '../../assets/HomeImage/allProduct10.jpg'






export const MainSlider = () => {
    const slides = [
        {
            image: bag3,
            title: "CUE THE COLOR",

            buttonText: "Shop The Collection"
        },
        {
            image: bag4,
            title: "CUE THE COLOR",

            buttonText: "Shop The Collection"
        },
        {
            image: bag5,
            title: "CUE THE COLOR",

            buttonText: "Shop The Collection"
        },
        {
            image: bag6,
            title: "CUE THE COLOR",
            buttonText: "Shop The Collection"
        }
    ];

    return (
        <div className="h-[70vh] sm:h-[80vh] xl:h-[90vh] relative slider-container">
            <Carousel indicators={true} slideInterval={4000}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative h-full">
                        <img
                            src={slide.image}
                            alt={`slide-${index}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white px-4 max-w-2xl">
                                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold mb-4">
                                    {slide.title}
                                </h2>
                                <Button text={slide.buttonText} className="bg-orange-800 text-white hover:bg-orange-700" />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>

    );
};