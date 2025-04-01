"use client"

//components
import Footer from "../../components/footer";
import Header from "../../components/header";
import ModalCart from "../../components/modalCart";

//react
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IMask from "imask";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/modalSlice";
import { addToCart, removeFromCart, updateCartItem } from "../../redux/cartSlice";
import { incrementQuantity, decrementQuantity } from "../../redux/productSlice";

//images
import Image from "next/image";
import noImage from '../../../../public/image-no-image.jpg';

const ProductPage = ({ params }) => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.modalCart.isModalOpen)
    const cart = useSelector(state => state.cart.cart)
    const { id } = useParams();
    const [SelectedProduct, setSelectedProduct] = useState({})
    const [value, setValue] = useState(0)
    const inputRef = useRef(null);
    
    const handleQuantityIncrement = () => {
        setValue((prev) => prev + 1)
    }  
    
    const handleQuantityDecrement = () => {
        setValue((prev) => (prev > 0 ? prev - 1 : prev))
    }

    const handleChangeQuantity = (event) => { //rever a logica dessa funcao
        const newQuantity = parseInt(event.target.value)
        if(!isNaN(newQuantity) && newQuantity >= 1){
            setValue(newQuantity);
        }
    }
    
    const handleCartModal = () => {
        dispatch(toggleCart())
        console.log(`Estado do modal agora é ${!isModalOpen}`)
    }

    const handleAddToCart = () => { 
        const storedItem = localStorage.getItem('SelectedProduct');
        if(!storedItem) return;

        const newItem = JSON.parse(storedItem);

        const existingProduct = cart.find(item => item.idproducts == newItem.idproducts);

        if(existingProduct){
            dispatch(updateCartItem({
                idproducts: newItem.idproducts,
                quantity: existingProduct.quantity + Number(value)
            }))
        }else{
            dispatch(addToCart({...newItem, quantity: value}));
        }

    }

    useEffect(() => {
        if(typeof window !== "undefined"){
            const product = localStorage.getItem('SelectedProduct')
            if (product) {
                setSelectedProduct(JSON.parse(product))
            }
        }
    }, [])

    useEffect(() => {   
        if(inputRef.current){
            IMask(inputRef.current, {
                mask: "00000-000",
                lazy: false
            })
        }
    }, [])

    return(
        <>
            <div className="relative max-w-9/10 mx-auto px-2 bg-[#FFFFFF]">
                <header className="mb-8">
                    <Header onCartClick={handleCartModal}/>
                    <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
                </header>

                <main className="w-full h-screen flex justify-center">
                    <section className="flex-1 flex flex-col gap-4 p-4 max-w-2xl">
                        <div className="w-full max-w-md aspect-square relative mx-auto">
                            <Image 
                            src={SelectedProduct.image ? SelectedProduct.image : noImage} 
                            alt={SelectedProduct.name}
                            fill
                            className="object-cover rounded-lg shadow-md"
                            />
                        </div>

                        <div className="bg-[#F5F5F5] rounded-lg w-full p-8 text-black">
                            <h1 className="mb-4 text-xl">Description</h1>
                            <p>{SelectedProduct.description}</p>
                            <p>Tamanho da Camiseta:</p>
                            <p>P: 00 x 00 cm</p>
                            <p>M: 00 x 00 cm</p>
                            <p>G: 00 x 00 cm</p>
                            <p>GG: 00 x 00 cm</p>
                        </div>
                    </section>

                    {/* coluna direita: informacoes produto */}
                    <section className="flex-1 space-y-6 p-4 max-w-xl">
                        <div className="relative bg-[#F5F5F5] rounded w-full p-8">
                            <div className="absolute left-4 top-4 bg-black p-2">
                                <p className="text-white text-sm">-21%</p>
                            </div>

                            <h1 className="text-3xl font-bold font-title mt-8 mb-4">{SelectedProduct.name}</h1>
                            <p className="text-black">{SelectedProduct.description}</p>
                            <p className="underline text-blue-500 mb-4 cursor-pointer">More information</p>

                            <div className="space-y-2 text-black">
                                <p className="space-x-2">A partir de <span className="font-bold text-2xl">R$ {SelectedProduct?.price ? SelectedProduct.price.toFixed(2) : "0.00"}</span> <span className="line-through">R$ {SelectedProduct?.price ? (SelectedProduct.price + 10).toFixed(2) : "0.00"}</span></p>
                                <p>R$ {SelectedProduct?.price ? (SelectedProduct.price - 5).toFixed(2) : "0.00"} in cash</p>
                            </div>

                            <div className="w-full border-t mt-4"/>

                            <div className="flex flex-col my-4">
                                <h3>Tamanho</h3>

                            </div>

                            <div className="flex items-center space-x-2 my-4">
                                    <p className="text-gray-700">Quantidade:</p>
                                <div className="bg-[#FFFFFF] p-2 rounded-lg">
                                    <span 
                                    className="px-4 py-2 hover:bg-gray-200 rounded focus:outline-none cursor-pointer"
                                    onClick={handleQuantityDecrement}
                                    >
                                        -
                                    </span>
                                    <input 
                                    type="number" 
                                    className="w-16 text-center bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-center appearance-none"
                                    defaultValue={value}
                                    value={value}
                                    onChange={() => handleChangeQuantity}
                                    />
                                    <span 
                                    className="px-4 py-2 hover:bg-gray-200 rounded focus:outline-none cursor-pointer" 
                                    onClick={handleQuantityIncrement}
                                    > 
                                        +
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 cursor-pointer"
                                >
                                    <Link href='/checkout'> {/* aqui vai enviar o produto para o checkout */}
                                        Comprar Agora
                                    </Link>
                                </button>
                                <button 
                                className="bg-[#333333] text-white px-4 py-2 rounded-lg mt-2 cursor-pointer"
                                onClick={handleAddToCart}
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>

                        <div className="w-full rounded-lg bg-[#F5F5F5] p-6">
                            <h1 className="text-xl font-semibold mb-2">Calcule seu frete</h1>

                            <div className="flex flex-col gap-3">
                                <div className="flex max-w-2/3 space-x-4">
                                    <input 
                                    ref={inputRef}
                                    type="text" 
                                    placeholder="00000-000" 
                                    className="flex-1 p-3 rounded-lg bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-blue-400 transition appearance-none"
                                    />
                                    <button className="px-4 py-2 bg-white rounded-lg cursor-pointer">Calcular</button>
                                </div>

                                <Link href='https://buscacepinter.correios.com.br/app/endereco/index.php' legacyBehavior>
                                    <a target="_blank" rel="noopener noreferrer" className="underline text-blue-500 cursor-pointer">
                                        Don't know my Zip-Code
                                    </a>
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