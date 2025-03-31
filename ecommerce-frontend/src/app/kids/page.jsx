"use client"

//components
import Header from "../components/header";
import Footer from "../components/footer";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { toggleCart } from "../redux/modalSlice";

//react
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//images
import noImage from '../../../public/image-no-image.jpg';
import ModalCart from "../components/modalCart";

const Kids = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const isModalOpen = useSelector(state => state.modalCart.isModalOpen);
    const router = useRouter();
    const [type, setType] = useState('')

    const handleCartModal = () => {
        dispatch(toggleCart())
        console.log(`Estado do modal agora é ${!isModalOpen}`)
    }

    const handleBuy = (id, product) => {   
        localStorage.setItem('SelectedProduct', JSON.stringify(product));
        console.log("id do produto", products.idproducts)
        // if(!product || !products.idproducts){ arrumar a condicional
        //     return;
        // }
        router.push(`/products/${id}`)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products')
                const data = await response.json()
                const filterData = data.result.filter(item => item.category_idcategories === 2)
                console.log(filterData)
                dispatch(setProducts(filterData)) 
            } catch (error) {
                console.log("erro ao buscar os dados", error)
            }
        }
        fetchProducts()
    }, [dispatch])

    const typeProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/type?type=${type}`)
            if(!response.ok){
                throw new Error("Erro ao buscar os dados solicitados.", response.status)
            }
            const data = await response.json()
            const filterData = data.result.filter(item => item.category_idcategories === 2);
            dispatch(setProducts(filterData))
        } catch (error) {
            console.log("Erro ao buscar os dados", error)
        }
    }

    const handleFilterClick = (type) => {
        setType(type)
    }

    useEffect(() => {
        if(type){
            typeProducts(type)
        }
    }, [type])

    return(
        <>
        <div className="relative max-w-9/10 mx-auto px-2 bg-[#FFFFFF]">
            <header>
                <Header onCartClick={handleCartModal}/>
                <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
            </header>

            <main className="w-full h-full flex">
                {/* filter section */}
                <section className="flex flex-1 w-24 h-full mr-2"> 
                    <div className="w-full rounded flex flex-col items-center">
                        <div className="rounded my-8 bg-[#F5F5F5] w-full max-w-2/3 p-6 shadow-md">   
                            <div className="flex space-x-4 items-center justify-between">
                                <h2 className="text-lg font-semibold mb-4">Ordernar por</h2>


                                <select className="bg-white rounded-md p-2 mb-4"> 
                                    <option value="relevance">Relevance</option>
                                    <option value="lowest">Lowest Price</option>
                                    <option value="highest">Highest Price</option>
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
                                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                            </div>

                            <ul className="space-y-2">
                                <li className="cursor-pointer py-1 px-2 rounded hover:bg-black hover:text-white transition" onClick={() => handleFilterClick('shirt')}>
                                    Shirts
                                </li>

                                <li className="cursor-pointer py-1 px-2 rounded hover:bg-black hover:text-white transition" onClick={() => handleFilterClick('pants')}>
                                    Pants
                                </li>

                                <li className="cursor-pointer py-1 px-2 rounded hover:bg-black hover:text-white transition" onClick={() => handleFilterClick('accessories')}>
                                    Accessories
                                </li>

                                <li className="cursor-pointer py-1 px-2 rounded hover:bg-black hover:text-white transition" onClick={() => handleFilterClick('sneaker')}>
                                    Sneakers
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* catalog section */}
                <section className="flex flex-2 w-64">
                    <div className="w-full h-full">
                        <div className="grid grid-cols-3 gap-4">
                            {products.length > 0 && (
                                products.map((product) => (
                                    <div 
                                    key={product.idproducts} 
                                    className="border shadow-lg rounded flex flex-col items-center justify-center p-8"
                                    >
                                        <Image 
                                        src={product.image ? product.image : noImage} 
                                        alt={product.name} 
                                        className="rounded"
                                        /> 
                                        <h1 className="text-2xl text-[#000] font-semibold font-title mb-2">{product.name}</h1>
                                        <p className="text-lg mb-2 text-gray-700 font-sans">R$ {product.price.toFixed(2)}</p>
                                        <button 
                                        className="px-4 py-2 rounded-lg bg-[#7886C7] hover:bg-[#2D336B] transform transition duration-300 text-[#000] cursor-pointer"
                                        onClick={() => handleBuy(product.idproducts, product)}
                                        >
                                            Comprar
                                        </button>
                                    </div>
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

export default Kids;