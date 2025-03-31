"use client"

//components
import Footer from "../components/footer";
import Header from "../components/header";
import ModalCart from "../components/modalCart";

//react
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/modalSlice";
import { addToCart, removeFromCart, updateCartItem } from "../redux/cartSlice";
import { incrementQuantity, decrementQuantity } from "../redux/cartSlice";

//images
import Image from "next/image";
import noImage from '../../../public/image-no-image.jpg';

const Checkout = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.modalCart.isModalOpen)

    const handleCartModal = () => {
        dispatch(toggleCart())
    }

    return(
        <>
            <div className="relative max-w-9/10 mx-auto px-2 bg-[#FFFFFF]">
                <header className="mb-8">
                    <Header onCartClick={handleCartModal}/>
                    <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
                </header>

                <main className="w-full h-screen flex justify-center space-x-8 mx-auto">
                    <section className="w-full max-w-2/4">
                        <div className="w-full border bg-gray-200 rounded p-6">
                            <h1 className="text-xl mb-4">Itens do carrinho</h1>

                            <div>
                                <Image src={noImage} alt="Imagem" width={32} height={32}/>
                            </div>
                        </div>
                    </section>

                    <section className="w-full max-w-2/3">
                        <div className="w-full border bg-gray-200 rounded p-6">
                            <h1>Resumo</h1>
                            <div className="flex">
                                <p>Produto</p>
                                <p>R$</p>
                            </div>
                            <div className="flex">
                                <p>Taxa de entrega</p>
                                <p>Calcular</p>
                            </div>

                            <div className="border-b border-gray-100 "/>

                            <div className="flex">
                                <p>Total do pedido</p>
                                <p>R$</p>
                            </div>

                            <button>Finalizar Compra</button>
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

export default Checkout;