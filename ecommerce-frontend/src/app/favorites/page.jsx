'use client'

//react
import Image from "next/image";

//redux
import { useDispatch, useSelector } from "react-redux";

//components
import Header from "../components/header";
import ModalCart from "../components/modalCart";
import Footer from "../components/footer";
import { toggleCart } from "../redux/modalSlice";

//images
import noImage from '../../../public/image-no-image.jpg';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.favorites)
    const isModalOpen = useSelector(state => state.modalCart.isModalOpen)
    const router = useRouter()

    const handleCartModal = () => {
        dispatch(toggleCart())
    }

    const handleBuy = (id, product) => {
        localStorage.setItem('SelectedProduct', JSON.stringify(product))
        router.push(`/products/${id}`)
    }

    useEffect(() => {
        if(favorites){

        }
    })

    return(
        <>
            <div className="relative max-w-9/10 mx-auto px-2 bg-[#FFFFFF]">
                <header>
                    <Header onCartClick={handleCartModal}/>
                    <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
                </header>

                <main className="w-full h-full flex mb-4">
                    <section className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 gap-6">
                        {favorites.length > 0 ? (
                            favorites.map((fav) => (
                                <div key={fav.idproducts} className="flex flex-col items-center justify-between bg-[#F5F5F5] shadow-md rounded-lg p-4 text-black">
                                    <Image 
                                    src={`http://localhost:5000/media/${fav.image_url}` ? `http://localhost:5000/media/${fav.image_url}` : noImage} 
                                    alt={fav.name ? fav.name : "uma imagem"}
                                    width={200}
                                    height={100}
                                    />
                                    <p className="mt-4 text-lg">{fav.name}</p>
                                    <p className="mt-2 text-lg font-semibold">R$ {fav.price.toFixed(2)}</p>
                                    <button className="px-4 py-2 rounded-lg bg-[#7886C7] hover:bg-[#2D336B] transform transition duration-300 text-[#000] cursor-pointer"
                                    onClick={() => handleBuy(fav.idproducts, fav)}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            ))
                        ) : <p className="col-span-3 text-center text-gray-500">Carregando Produtos...</p> }
                    </section>
                </main>
            </div>
            <footer>
                <Footer/>
            </footer>
        </>
    )

}

export default Favorites;