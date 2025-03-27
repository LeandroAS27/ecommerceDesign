"use client"

//components
import Header from "../components/header";
import Footer from "../components/footer";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { toggleCart } from "../redux/modalSlice";

//react
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//images
import noImage from '../../../public/image-no-image.jpg';
import ModalCart from "../components/modalCart";
import person from '../../../public/icons8-pessoa.png';
import box from '../../../public/box.png';

const Profile = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const isModalOpen = useSelector(state => state.modalCart.isModalOpen);
    const router = useRouter();

    const handleCartModal = () => {
        dispatch(toggleCart())
    }

    return(
        <>
            <div className="relative max-w-9/10 mx-auto px-2 bg-[#FFFFFF]">
                <header>
                    <Header onCartClick={handleCartModal}/>
                    <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
                </header>

                <main className="w-full h-dvh flex">    
                    <div className="w-full flex ">
                        <div className="w-full max-w-2/4 flex">
                            <nav className="w-1/3 border-r p-4">
                                <ul className="space-y-4">
                                    <li className="flex space-x-2 border-b items-center p-2 cursor-pointer">
                                        <Image 
                                        src={person} 
                                        alt="icone de uma pessoa" 
                                        height={42} 
                                        width={42} 
                                        className="border rounded-full bg-[#EEEEEE] p-2 object-contain"
                                        />
                                        <span>Meu cadastro</span>
                                    </li>

                                    <li className="flex space-x-2 border-b items-center p-2 cursor-pointer">
                                        <Image 
                                        src={box} 
                                        alt="icone de uma pessoa" 
                                        height={42} 
                                        width={42} 
                                        className="border rounded-full bg-[#EEEEEE] p-2"
                                        />
                                        <span>Meus pedidos</span>
                                    </li>
                                </ul>
                            </nav>

                            {/* area de conteudo dinamico */}
                            <section className="w-2/3 p-6">
                                <h2>content</h2>
                            </section>
                        </div>
                    </div>
                </main>
            </div>

            <footer>
                <Footer/>
            </footer>
        </>
    )
}

export default Profile;