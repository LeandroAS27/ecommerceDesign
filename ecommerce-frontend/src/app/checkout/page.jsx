"use client"

//components
import Footer from "../components/footer";
import Header from "../components/header";
import ModalCart from "../components/modalCart";

//react
import { useState, useEffect, use } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/modalSlice";

//images
import Image from "next/image";
// import noImage from '../../../public/image-no-image.jpg';

const Checkout = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.modalCart.isModalOpen)
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [userId, setUserId] = useState(null);
    const [refresh, setRefresh] = useState(false);
 
    const handleCartModal = () => {
        dispatch(toggleCart())
    }

    const handleDeleteProduct = async(productId) => {
        try {
            const response = await fetch(`http://localhost:5000/checkout/${userId}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({productId, userId})
            });
            if(!response.ok){
                throw new Error("Erro ao deletar o produto", response.status)
            }
            setRefresh(prev => !prev)
            const data = await response.json();
            console.log('sucesos ao deletar o produto', data)
        } catch (error) {
            console.log("Erro ao deletar o produto")
        }
    }

    const handleSubmit = async() => {
        try {
            const response = await fetch('http://localhost:5000/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({ items })
            });
            const data = await response.json();
            window.location.href = data.url
        } catch (error) {
            console.error("Erro no checkout", error)
        }
    }

    useEffect(() => {
        const fetchCheckoutProduct = async() => {
            try {
                const response = await fetch(`http://localhost:5000/checkout/${userId}`);
                const data = await response.json()
                if(!response.ok){
                    throw new Error(data.message || response.status);
                }
                setOrder(data.order)
                setItems(data.items)
            } catch (error) {
                console.log("Erro ao buscar os dados", error)
            }
        }

        if(userId) fetchCheckoutProduct()
    }, [userId, refresh])

    useEffect(() => {
        if(typeof window !== undefined){
            const storedUser = localStorage.getItem('user')
            if(storedUser){
                const user = JSON.parse(storedUser)
                setUserId(user?.user?.id);
            }
        }
    }, [])

    return(
        <>
            <div className="relative max-w-9/10 mx-auto px-2 bg-[#FFFFFF]">
                <header className="mb-8">
                    <Header onCartClick={handleCartModal}/>
                    <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
                </header>

                <main className="w-full h-full flex flex-col md:flex-row justify-center md:space-x-8 mx-auto mb-4 space-y-4 md:space-y-0 px-4">
                    <section className="w-full md:max-w-2/4 mb-4 md:mb-0">
                        <div className="w-full border bg-[#FFFFFF] rounded-lg shadow-lg p-4 sm:p-6">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Itens do carrinho</h1>

                            {items.length > 0 ? (
                                items.map((item) => (
                                    <div key={item.id} className="flex flex-col md:flex-row sm:items-center justify-between gap-4 mb-4 p-4 border-b last:border-b-0">
                                        <div className="relative w-full sm:w-20 h-48 sm:h-20 flex-shrink-0 mx-auto sm:mx-0">
                                            <Image
                                                src={`http://localhost:5000/media/${item.image_url}`}
                                                alt={item.name}
                                                layout="fill"
                                                className="object-cover rounded-md"
                                            />
                                        </div>

                                        <div className="flex-1 text-center sm:text-left">
                                            <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
                                            <p className="text-gray-600">Quantidade: {item.quantity}</p>
                                            <p className="text-gray-600">Subtotal: R$ {item.subtotal.toFixed(2)}</p>
                                        </div>

                                        <div className="flex justify-center sm:justify-end">
                                            <button 
                                            className="cursor-pointer py-2 px-4 bg-blue-500 hover:bg-[#03346E] transition duration-300 ease-in-out text-white rounded-xl shadow-lg font-semibold"
                                            onClick={() => handleDeleteProduct(item.product_id)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">Nenhum item no carrinho.</p>
                            )}
                        </div>
                    </section>

                    <section className="w-full md:max-w-2/3">
                        <div className="w-full border bg-[#FFFFFF] rounded-lg shadow-lg p-4 sm:p-6">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Resumo do pedido</h1>

                            <div className="flex justify-between items-center mb-4 text-sm sm:text-base">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700 font-semibold">R$ {order ? order.total_price.toFixed(2) : "0.00"}</p>
                            </div>

                            <div className="flex justify-between items-center mb-4 text-sm sm:text-base">
                                <p className="text-gray-700">Taxa de entrega</p>
                                <p className="text-gray-700 font-semibold">Calcular</p>
                            </div>

                            <div className="border-b border-gray-100 my-4"/>

                            <div className="flex justify-between items-center mb-8 text-lg sm:text-xl">
                                <p className="text-xl font-bold text-gray-800">Total do pedido</p>
                                <p className="text-xl font-bold text-gray-800">R$ {order ? order.total_price.toFixed(2) : "0.00"}</p>
                            </div>

                            <button 
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-[#03346E] transition duration-300 ease-in-out cursor-pointer"
                            onClick={handleSubmit}
                            >
                                Finalizar Compra
                            </button>
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