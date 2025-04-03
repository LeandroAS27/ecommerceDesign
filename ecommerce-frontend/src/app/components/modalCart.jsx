"use client"

//react
import { useState } from "react";
import Link from "next/link";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantityFromCart, decreaseQuantityFromCart, removeFromCart, updateCartItem } from "../redux/cartSlice";

//images
import Image from "next/image";
import noImage from '../../../public/image-no-image.jpg';
import thrash from '../../../public/lixo.png';

const ModalCart = ({ onClose, isOpen }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)
    
    const handleDecrease = (idproducts) => {
        dispatch(decreaseQuantityFromCart(idproducts))
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

            <div className={`relative bg-[#EEEEEE] w-96 h-full shadow-2xl p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <h2 className="text-2xl font-bold text-gray-800">Seu carrinho</h2>
                <button 
                onClick={onClose}
                className="absolute top-0 right-4 mt-4 px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded"
                >
                    Fechar
                </button>

                <div className="space-y-4 max-h-[70vh] pr-2">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.idproducts} className="flex items-center p-3 border rounded-lg shadow-sm mt-6">
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <Image 
                                    src={item.imageURL ? item.imageURL : noImage} 
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
                    <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer">
                        <Link href='/checkout'> {/* aqui vai enviar os produtos para o checkout */}
                            Finalizar Compra
                        </Link>
                    </button>
                    </div>
                )}

            </div>
        </div>  
    )
}

export default ModalCart;