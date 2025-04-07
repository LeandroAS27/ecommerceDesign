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
import person from '../../../public/icons8-pessoa.png';
import box from '../../../public/box.png';

const Profile = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const isModalOpen = useSelector(state => state.modalCart.isModalOpen);
    const router = useRouter();
    const [myOrderDetails, setMyOrderDetails] = useState([])
    const [userActive, setuserActive] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [activeView, setActiveView] = useState(null)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        
        if(userData){
            setuserActive(userData)

            if(userData.user.role === 'admin'){
                setIsAdmin(true)
            }else{
                setIsAdmin(false)
            }
        }else{
            setuserActive(null)
            setIsAdmin(false)
        }

    }, [])

    const handleCartModal = () => {
        dispatch(toggleCart())
    }

    const handleMyProfileDetails = () => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setuserActive(userData)
        setActiveView('profile')
    }


    const handleMyOrderDetails = async() => {
        console.log('funcionou')
        try {
            const response = await fetch('http://localhost:5000/order')
            if(!response.ok){
                throw new Error(`Erro ao buscar o pedido: ${response.status}`)
            }
            const data = await response.json();
            setMyOrderDetails(data)
            setActiveView('orders')
        } catch (error) {
            console.log("Erro ao buscar os dados do pedido", error)
        }
    }

    console.log(myOrderDetails)

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
                                    <li className="flex space-x-2 border-b items-center p-2 cursor-pointer" onClick={handleMyProfileDetails}>
                                        <Image 
                                        src={person} 
                                        alt="icone de uma pessoa" 
                                        height={42} 
                                        width={42} 
                                        className="border rounded-full bg-[#EEEEEE] p-2 object-contain"
                                        />
                                        <span>Meu cadastro</span>
                                    </li>

                                    <li className="flex space-x-2 border-b items-center p-2 cursor-pointer" onClick={handleMyOrderDetails}>
                                        <Image 
                                        src={box} 
                                        alt="icone de uma pessoa" 
                                        height={42} 
                                        width={42} 
                                        className="border rounded-full bg-[#EEEEEE] p-2"
                                        />
                                        <span>Meus pedidos</span>
                                    </li>

                                    {isAdmin && (
                                        <li className="flex space-x-2 border-b items-center p-2 cursor-pointer">
                                            <Image
                                            src={noImage}
                                            alt="icone para criar pedidos"
                                            height={42}
                                            width={42}
                                            className="border rounded-full bg-[#EEEEEE] p-2"
                                            />
                                            <span>Criar pedidos</span>
                                        </li>
                                    )}
                                </ul>
                            </nav>

                            {/* area de conteudo dinamico */}
                            {activeView === 'profile' && userActive ? (
                                <section className="w-2/3 p-6">
                                    <h2 className="text-xl mb-8">Dados do usuario</h2>
                                    <div className="bg-gray-300 w-full border rounded-lg shadow-lg flex flex-col p-6">
                                        <p>Nome: {userActive.user.name}</p>
                                        <p>Email: {userActive.user.email}</p>
                                    </div>
                                </section>
                            ) : activeView === 'orders' && myOrderDetails && myOrderDetails.result ? (
                                <section className="w-2/3 p-6">
                                    <h2 className="text-xl font-semibold mb-4">Detalhes do pedido</h2>
                                    <table className="w-full border border-gray-300 text-left">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 border-b">ID do pedido</th>
                                                <th className="p-2 border-b">Status</th>
                                                <th className="p-2 border-b">Preço Total</th>
                                                <th className="p-2 border-b">Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {myOrderDetails.result.map((order) => (
                                            <tr key={order.idorders} className="hover:bg-gray-50">
                                                <td className="p-2 border-b">{order.idorders}</td>
                                                <td className="p-2 border-b">{order.status}</td>
                                                <td className="p-2 border-b">{order.total_price.toFixed(2)}</td>
                                                <td className="p-2 border-b">{new Date(order.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </section>
                            ) : ( 
                                <p>content</p> 
                            )}
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