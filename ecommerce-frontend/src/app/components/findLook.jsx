"use client"
import { useState } from "react";
import Image from "next/image";
import womenCollection from '../../../public/womenCollection.jpg';
import menCollection2 from '../../../public/menCollection2.webp';
import kidsCollection from '../../../public/kidsCollection.webp';

const FindLook = () => {

    const images = [
        {src: womenCollection, label: "Women"},
        {src: menCollection2, label: "Men"},
        {src: kidsCollection, label: "Kids"}
    ]

    return(
        <section className="w-full flex flex-col items-center rounded mb-16">
            <h1 className="text-4xl mb-14">Find Your Look</h1>

            <div className="grid grid-cols-3 gap-x-8">
                {images.map((item,index) => (
                    <div key={index} className="relative w-[500px] h-[600px] cursor-pointer">
                        <Image 
                        src={item.src} 
                        alt={`Foto de ${item.label}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                        />

                        <div className="absolute right-4 bottom-4 px-4 py-2 bg-white rounded">
                            <p>{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FindLook;