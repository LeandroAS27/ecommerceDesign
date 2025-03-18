"use client"
import { useState } from "react";
import Image from "next/image";
import collection1 from '../../../public/collection 1.webp'
import collection2 from '../../../public/collection 2.webp'
import collection3 from '../../../public/collection 3.webp'
import collection4 from '../../../public/collection 4.webp'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';


const Carousel = () => {
    const [current, setCurrent] = useState(0);

    const images = [
        {id: 3, image: collection1},
        {id: 1, image: collection2},
        {id: 2, image: collection3},
        {id: 0, image: collection4},
    ]

    const nextSlide = (prev) => {
        setCurrent((prev) => (prev + 1 + images.length) % images.length)
    }

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }

    return(
        <>
            <div className="relative w-full h-96 border rounded">
                {images.map((item) => (
                    <div key={item.id} className={`absolute transition-opacity duration-700 w-full h-full rounded ${item.id === current ? "opacity-100" : "opacity-0"}`}>
                        <Image
                        src={item.image}
                        alt={`Slide ${item.id + 1}`}
                        className="w-full h-full object-none rounded"
                        />

                        <div className="absolute top-1/2 -translate-y-1/2 left-20 space-y-2">
                            <h1 className="text-5xl text-[#FDFAF6] font-bold">Timeless Fashion,</h1>
                            <h2 className="text-3xl text-[#FDFAF6]">Conscious Choices</h2>

                            <p className="text-lg text-[#EEEEEE]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam unde mollitia explicabo incidunt ipsa error </p>

                            <button className="px-6 py-4 bg-[#EFEFEF] rounded-full mt-4">
                                <span className="text-black font-bold">Explore the Collections</span>
                            </button>
                        </div>

                        <div className="space-x-12">
                            <button
                                className="absolute top-1/2 right-4 translate-y-32 hover:filter-invert cursor-pointer"
                                onClick={prevSlide}
                            >
                                <CircleArrowLeft size={32} className="hover:invert"/>
                            </button>
                            <button
                                className="absolute top-1/2 right-4 translate-y-32 hover:filter-invert cursor-pointer"
                                onClick={nextSlide}
                            >
                                <CircleArrowRight size={32} className="hover:invert"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Carousel;