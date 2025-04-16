"use client"

//react
import { useState } from "react";

//next
import Image from "next/image";
import Link from "next/link";

//images
import collection1 from '../../../public/collection 1.webp'
import collection4 from '../../../public/collection 4.webp'
import collection6 from '../../../public/collection 6.webp'
import collection7 from '../../../public/collection 7.jpg'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

//framer motion
import { motion } from 'motion/react';


const Carousel = () => {
    const [current, setCurrent] = useState(0);

    const images = [
        {id: 0, image: collection1},
        {id: 1, image: collection6},
        {id: 2, image: collection7},
        {id: 3, image: collection4},
    ]

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1 + images.length) % images.length)
    }

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }

    return(
        <>
            <motion.div 
            className="relative w-full h-72 sm:h-80 md:h-96 rounded"
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{
                duration: 0.6,
                ease: 'easeOut'
            }}
            >
                {images.map((item) => (
                    <div key={item.id} className={`absolute transition-opacity duration-700 w-full h-full rounded shadow-md ${item.id === current ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointers-events-none"}`}>
                        <Image
                        src={item.image}
                        alt={`Slide ${item.id + 1}`}
                        className="w-full h-full object-cover rounded"
                        />

                        <div className="absolute top-30 left-4 md:top-1/2 -translate-y-1/2 md:left-20 md:space-y-2">
                            <h1 className="text-2xl md:text-5xl text-[#FAF1E6] font-bold">Timeless Fashion,</h1>
                            <h2 className="md:text-3xl text-[#FDFAF6]">Conscious Choices</h2>

                            <p className="text-sm md:text-lg text-[#FDFAF6] mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam unde mollitia explicabo incidunt ipsa error </p>

                            
                            <Link href='/collections' className="text-sm md:text-lg text-black font-bold cursor-pointer px-4 py-2 md:px-6 md:py-4 bg-[#F6F0F0] rounded-full mt-4">Explore the Collections</Link>
                            
                        </div>

                        <div className="space-x-12">
                            <button
                                className="absolute top-1/2 right-4 translate-y-28 md:translate-y-32 hover:filter-invert cursor-pointer"
                                onClick={prevSlide}
                            >
                                <CircleArrowLeft size={32} className="hover:invert"/>
                            </button>
                            <button
                                className="absolute top-1/2 right-4 translate-y-28 md:translate-y-32 hover:filter-invert cursor-pointer"
                                onClick={nextSlide}
                            >
                                <CircleArrowRight size={32} className="hover:invert"/>
                            </button>
                        </div>
                    </div>
                ))}
            </motion.div>
        </>
    )
}

export default Carousel;