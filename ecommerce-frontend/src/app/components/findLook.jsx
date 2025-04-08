"use client"
import Link from "next/link";
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
            <h1 className="text-3xl md:text-4xl mb-10 md:mb-14">Find Your Look</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-x-8 w-full w-full px-2">
                {images.map((item,index) => (
                    <div key={index}>
                        <Link href={`/${item.label.toLowerCase()}`} passHref>
                            <div 
                            className="relative w-full h-[400px] sm:h-[450px] md:h-[600px] cursor-pointer hover:scale-102 transition duration-300 shadow-md"
                            >
                                <Image 
                                src={item.src} 
                                alt={`Foto de ${item.label}`}
                                fill
                                style={{objectFit: "cover"}}
                                className="rounded"
                                />

                                <div className="absolute right-4 bottom-4 px-4 py-2 bg-[#F6F0F0] rounded">
                                    <p>{item.label}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FindLook;