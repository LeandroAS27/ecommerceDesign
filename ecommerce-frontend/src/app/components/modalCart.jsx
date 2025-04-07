"use client"

//react
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//redux
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantityFromCart, decreaseQuantityFromCart, removeFromCart } from "../redux/cartSlice";

//images
import Image from "next/image";
import noImage from '../../../public/image-no-image.jpg';
import thrash from '../../../public/lixo.png';

const ModalCart = ({ onClose, isOpen }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = () => {
        const user = localStorage.getItem('user')
        if(user){
            setUserInfo(JSON.parse(user))
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    console.log(cart)
    
    const handleDecrease = (idproducts) => {
        dispatch(decreaseQuantityFromCart(idproducts))
    }

    const sendToCheckout = async() => {
        console.log('botao funcionou')
        try {
            const response = await fetch('http://localhost:5000/checkout/add-item/cart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userInfo.user.id,
                    items: cart.map(item => ({
                        productId: item.idproducts,
                        image: item.image_url,
                        quantity: item.quantity,
                        price: item.price
                    })) 
                })
            })
            if(!response.ok){
                throw new Error("Erro ao enviar os dados", response.status)
            }
            const data = await response.json();
            console.log('reposta do backend', data)

            router.push('/checkout')
        } catch (error) {
            console.log("Erro ao adicionar item ao carrinho", error);
        }
    }

    const handleIncrease = (idproducts) => {
        dispatch(increaseQuantityFromCart(idproducts))
    }

    const handleRemoveFromCart = (idproducts) => {
        dispatch(removeFromCart(idproducts));
    }
    
    return(
        <div className={`fixed inset-0 flex justify-end z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}>
            <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300" onClick={onClose}/>
            
            {/* modal lateral */}

            <div 
            className={`relative bg-[#F7F7F7] w-96 h-full shadow-2xl p-6 transform transition-transform duration-300 ease-in-out 
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <h2 className="text-2xl font-bold text-gray-800">Seu carrinho</h2>
                <button 
                onClick={onClose}
                className={`absolute top-0 right-4 mt-4 px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded cursor-pointer`}
                >
                    Fechar
                </button>

                <div className="space-y-4 max-h-[70vh] pr-2">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.idproducts} className="flex items-center p-3 border rounded-lg shadow-sm mt-6">
                                <div className="relative w-16 h-24 flex-shrink-0">
                                    <Image 
                                    src={`http://localhost:5000/media/${item.image_url}`}
                                    width={200}
                                    height={100}
                                    alt={item.name}
                                    className="object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1 ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex justify-center items-center space-x-2">
                                    <span 
                                    className="text-2xl font-bold text-gray-700 hover:text-gray-900 transition cursor-pointer"
                                    onClick={() => handleDecrease(item.idproducts)}
                                    >
                                        -
                                    </span>

                                    <span className="text-gray-700">{item.quantity}</span>

                                    <span 
                                    className="text-2xl font-bold text-gray-700 hover:text-gray-900 transition cursor-pointer"
                                    onClick={() => handleIncrease(item.idproducts)}
                                    >
                                        +
                                    </span>

                                    <span>
                                        <Image 
                                        src={thrash} 
                                        alt="thrash icon" 
                                        className="cursor-pointer" 
                                        width={24} 
                                        height={24}
                                        onClick={() => handleRemoveFromCart(item.idproducts)}
                                        />
                                    </span>
                                </div>

                            </div>
                        ))
                    ) : <p>Itens no carrinho...</p>
                    }
                </div>
                {cart.length > 0 && (
                    <div className="mt-6">
                    <button 
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer" 
                    onClick={sendToCheckout}
                    >
                        Finalizar Compra
                    </button>
                    </div>
                )}

            </div>
        </div>  
    )
}

export default ModalCart;