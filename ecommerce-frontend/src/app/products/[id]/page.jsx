"use client"

//components
import Footer from "../../components/footer";
import Header from "../../components/header";
import ModalCart from "../../components/modalCart";

//react
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/modalSlice";

//images
import Image from "next/image";
import noImage from '../../../../public/image-no-image.jpg';

const ProductPage = ({ params }) => {
    const { id } = useParams()
    const [SelectedProduct, setSelectedProduct] = useState({})
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.modalCart.isModalOpen)


    const handleCartModal = () => {
        dispatch(toggleCart())
        console.log(`Estado do modal agora é ${!isModalOpen}`)
    }


    useEffect(() => {
        if(typeof window !== "undefined"){
            const product = localStorage.getItem('SelectedProduct')
            if (product) {
                setSelectedProduct(JSON.parse(product))
            }
        }
    }, [])

    console.log(SelectedProduct)

    return(
        <>
            <div className="relative max-w-9/10 mx-auto px-2 bg-[#FFFFFF]">
                <header>
                    <Header onCartClick={handleCartModal}/>
                    <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
                </header>

                <main className="w-full h-screen flex">
                    <section className="flex-1 flex flex-col gap-4 p-4">
                        <div className="w-full max-w-md aspect-square relative mx-auto">
                            <Image 
                            src={SelectedProduct.image ? SelectedProduct.image : noImage} 
                            alt={SelectedProduct.name}
                            fill
                            className="object-cover rounded-lg shadow-md"
                            />
                        </div>

                        <div className="bg-gray-300 rounded w-full p-4">
                            <h1>Description</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non voluptate magni nihil sint quidem deleniti nam explicabo corrupti, vitae possimus accusamus ipsum quam minus cum? Recusandae modi fugit ipsa natus.</p>
                            <p>Tamanho da Camiseta:</p>
                            <p>P: 00 x 00 cm</p>
                            <p>M: 00 x 00 cm</p>
                            <p>G: 00 x 00 cm</p>
                            <p>GG: 00 x 00 cm</p>
                        </div>
                    </section>

                    {/* coluna direita: informacoes produto */}
                    <section className="flex-1 space-y-6 p-4">
                        <div className="relative bg-gray-300 rounded w-full p-6">
                            <div className="absolute left-2 top-2 bg-black p-2">
                                <p className="text-white text-sm">-21%</p>
                            </div>

                            <h1 className="text-3xl font-bold font-title mt-8">{SelectedProduct.name}</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repudiandae inventore quam numquam architecto cumque cum harum.</p>
                            <p className="underline text-blue-500">More information</p>

                            <div>
                                <p>A partir de <span className="font-bold text-2xl">R$ {SelectedProduct?.price ? SelectedProduct.price.toFixed(2) : "0.00"}</span> <span className="line-through">R$ {SelectedProduct?.price ? (SelectedProduct.price + 10).toFixed(2) : "0.00"}</span></p>
                                <p>R$ {SelectedProduct?.price ? (SelectedProduct.price - 5).toFixed(2) : "0.00"} in cash</p>
                            </div>

                            <div className="w-full border-t mt-4"/>

                            <div className="flex flex-col">
                                <h3>Tamanho</h3>


                            </div>

                            <p>Quantidade:</p>

                            <div className="flex flex-col space-y-2">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Comprar agora</button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">Adicionar ao Carrinho</button>
                            </div>
                        </div>

                        <div className="w-full rounded bg-gray-400 p-4">
                            <h1 className="text-xl font-bold mb-2">Calcule seu frete</h1>

                            <div className="flex flex-col gap-3">
                                <div className="flex space-x-4">
                                    <input 
                                    type="number" 
                                    placeholder="00000-000" 
                                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    />
                                    <button className="px-4 py-2 bg-white rounded-lg">Calcular</button>
                                </div>

                                <Link href='/'>
                                    <span className="underline text-blue-500 cursor-pointer">Don't know my Zip-Code</span>
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <footer>
                <Footer/>
            </footer>
        </>
    )
}

export default ProductPage;