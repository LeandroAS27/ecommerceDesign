"use client"

//components
import Header from "../components/header";
import Footer from "../components/footer";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setProducts, sortProducts } from "../redux/productSlice";
import { toggleCart } from "../redux/modalSlice";

//react
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//images
import noImage from '../../../public/image-no-image.jpg';
import ModalCart from "../components/modalCart";

//framer motion
import { motion } from 'motion/react'

const Women = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items)
    const isModalOpen = useSelector((state) => state.modalCart.isModalOpen)
    const router = useRouter()
    const [type, setType] = useState('') // colocar isso no redux
    const [value, setValue] = useState('')
    const [activeView, setActiveView] = useState(null)
 
    const handleCartModal = () => {
        dispatch(toggleCart())
        console.log(`Estado do modal agora é ${!isModalOpen}`)
    }

    const handleBuy = (id, product) => {   
        localStorage.setItem('SelectedProduct', JSON.stringify(product))
        router.push(`/products/${id}`)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products')
                const data = await response.json()
                const filterData = data.result.filter(item => item.category_idcategories === 1)
                dispatch(setProducts(filterData)) 
            } catch (error) {
                console.log("erro ao buscar os dados", error)
            }
        }
        
        const typeProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products/type?type=${type}`)
                if(!response.ok){
                    throw new Error("erro ao buscar o produto especifico", response.status)
                }
                const data = await response.json()
                const filterData = data.result.filter(item => item.category_idcategories === 1)
                dispatch(setProducts(filterData))
            } catch (error) {
                console.log("erro ao buscar os dados", error)
            }
        }

        if(type){
            typeProducts()
        }else{
            fetchProducts()
        }

    }, [dispatch, type])
    

    const handleFilterClick = (selectedType) => {
        if(type === selectedType){
            setType(null)
            setActiveView(null)
        }else{
            setType(selectedType)
            setActiveView(selectedType)
        }
    }
    
    const handleOptionSelected = (e) => {
        const option = e.target.value
        setValue(option)
        dispatch(sortProducts(option));
    }

    console.log(value)

    return(
    <>
        <div className="relative max-w-9/10 mx-auto px-2 bg-[#FFFFFF]">
            <header>
                <Header onCartClick={handleCartModal}/>
                <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
            </header>

            <main className="w-full h-full flex flex-col md:flex-row">
                {/* filtro so para mobile */}
                <div className="w-full p-4 bg-[#F5F5F5] block md:hidden rounded mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-sembibold">Ordernar por</h2>
                        <select className="bg-white rounded-md p-2" value={value} onChange={handleOptionSelected}>
                            <option value="lowest">Menor preço</option>
                            <option value="highest">Maior preço</option>
                            <option value="a-z">A - Z</option>
                            <option value="z-a">Z - A</option>
                        </select>
                    </div>
                </div>

                {/* filter completo no desktop section */}
                <section className="hidden md:flex flex-1 w-24 h-full mr-2"> 
                    <div className="w-full rounded flex flex-col items-center justify-between">
                        <div className="rounded my-8 bg-[#F5F5F5] w-full max-w-2/3 p-6 shadow-md">   
                            <div className="flex space-x-4 items-center justify-between">
                                <h2 className="text-lg font-semibold mb-4">Ordenar por</h2>


                                <select className="bg-white rounded-md p-2 mb-4" value={value} onChange={handleOptionSelected}> 
                                    <option value="lowest">Menor preço</option>
                                    <option value="highest">Maior preço</option>
                                    <option value="a-z">A - Z</option>
                                    <option value="z-a">Z - A</option>
                                </select>
                            </div>
                                <div className="border-b mb-4"/>

                            <div className="rounded">
                                <h2 className="text-lg font-semibold mb-4">Tamanho</h2>

                                <input 
                                type="text" 
                                placeholder="Buscar Tamanho" 
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>
                        </div>

                        <div className="rounded bg-[#F5F5F5] p-6 shadow-md w-full max-w-2/3">
                            <div className="border-b mb-4">
                                <h2 className="text-lg font-semibold mb-4">Categorias</h2>
                            </div>

                            <ul className="space-y-2">
                                <li className={`cursor-pointer py-1 px-2 rounded hover:bg-black hover:text-white transition ${activeView === 'shirt' ? "bg-black text-white" : "bg-transparent"}`}
                                onClick={() => handleFilterClick('shirt')}
                                >
                                    Camisetas
                                </li>

                                <li className={`cursor-pointer py-1 px-2 rounded hover:bg-black hover:text-white transition ${activeView === 'pants' ? "bg-black text-white" : "bg-transparent"}`}
                                onClick={() => handleFilterClick('pants')}
                                >
                                    Calças
                                </li>

                                <li className={`cursor-pointer py-1 px-2 rounded hover:bg-black hover:text-white transition ${activeView === 'accessories' ? "bg-black text-white" : "bg-transparent"}`}
                                onClick={() => handleFilterClick('accessories')}
                                >
                                    Accessories
                                </li>

                                <li className={`cursor-pointer py-1 px-2 rounded hover:bg-black hover:text-white transition ${activeView === 'blouse' ? "bg-black text-white" : "bg-transparent"}`}
                                onClick={() => handleFilterClick('blouse')}
                                >
                                    Blusas
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* catalog section */}
                <section className="flex md:flex-2 md:w-64 mb-4">
                    <div className="w-full h-full">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {products.length > 0 && (
                                products.map((product) => (
                                    <motion.div 
                                    key={product.idproducts} 
                                    className="shadow-md rounded bg-[#FAFAFA] flex flex-col items-center justify-between md:justify-center p-8 w-full h-full hover:scale-105 transform transition duration-300"
                                    initial={{opacity: 0, scale: 0}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    >
                                        <Image 
                                        src={`http://localhost:5000/media/${product.image_url}` ? `http://localhost:5000/media/${product.image_url}` : noImage} 
                                        alt={product.name} 
                                        className="rounded"
                                        width={200}
                                        height={200}
                                        /> 
                                        <h1 className="text-xl md:text-2xl text-wrap text-[#000] font-semibold font-title mb-2">{product.name}</h1>
                                        <p className="text-lg mb-2 text-gray-700 font-sans">R$ {product.price.toFixed(2)}</p>
                                        <button 
                                        className="px-4 py-2 rounded-lg bg-[#7886C7] hover:bg-[#2D336B] transform transition duration-300 text-[#000] cursor-pointer"
                                        onClick={() => handleBuy(product.idproducts, product)}
                                        >
                                            Comprar
                                        </button>
                                    </motion.div>
                                ))
                            )}
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

export default Women;