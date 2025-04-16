"use client"

//components
import Header from "../components/header";
import Footer from "../components/footer";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/modalSlice";

//react
import { useEffect, useState } from "react";
import Image from "next/image";

//images
import noImage from '../../../public/image-no-image.jpg';
import ModalCart from "../components/modalCart";
import person from '../../../public/icons8-pessoa.png';
import box from '../../../public/box.png';
import information from '../../../public/icons8-informações-96.png';

const Profile = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.modalCart.isModalOpen);
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

    const handleMyProfileDetails = (data) => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setuserActive(userData)
        setActiveView(data)
    }


    const handleMyOrderDetails = async() => {
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


    return(
        <>
            <div className="relative max-w-9/10 mx-auto px-2">
                <header>
                    <Header onCartClick={handleCartModal}/>
                    <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
                </header>

                <main className="w-full h-dvh flex mb-4">    
                    <div className="w-full flex">
                        <div className="w-full flex flex-col md:flex-row">
                            <nav className="w-full md:w-1/3 md:border-r p-4">
                                <ul className="space-y-4">
                                    <li className={`flex space-x-2 border-b items-center p-2 cursor-pointer rounded ${activeView === 'profile' ? "bg-gray-200 transition duration-300" : "bg-transparent"}`} 
                                    onClick={() => handleMyProfileDetails('profile')}
                                    >
                                        <Image 
                                        src={person} 
                                        alt="icone de uma pessoa" 
                                        height={42} 
                                        width={42} 
                                        className="border rounded-full bg-[#EEEEEE] p-2 object-contain"
                                        />
                                        <span>Meu cadastro</span>
                                    </li>

                                    <li className={`flex space-x-2 border-b items-center p-2 cursor-pointer rounded ${activeView === 'orders' ? "bg-gray-200 transition duration-300" : "bg-transparent"}`} 
                                    onClick={handleMyOrderDetails}
                                    >
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
                                        <li className={`flex space-x-2 border-b items-center p-2 cursor-pointer rounded ${activeView === 'createProduct' ? "bg-gray-200 transition duration-300" : "bg-transparent"}`} 
                                        onClick={() => handleMyProfileDetails('createProduct')}
                                        >
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
                                <section className="w-full md:w-2/3 p-6">
                                    <h2 className="text-xl font-semibold mb-8">Dados do usuário</h2>
                                    <div className="w-full rounded-lg shadow-md border flex flex-col p-6">
                                        <p>Nome: {userActive.user.name}</p>
                                        <p>Email: {userActive.user.email}</p>
                                    </div>
                                </section>
                            ) : activeView === 'orders' && myOrderDetails && myOrderDetails.result ? (
                                <section className="w-full md:w-2/3 p-6">
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
                            ) : activeView === 'createProduct' && userActive ? (
                                // formulario para criar produto (adicionar imask)
                                <section className="w-full md:w-2/3 p-6 flex flex-col items-center">
                                    <h1 className="text-xl font-semibold mb-4">Formulario</h1>
                                    <form className="space-y-4 w-full md:max-w-2/4">
                                        <div>
                                            <input 
                                            type="text" 
                                            placeholder="Nome do produto" 
                                            className="border rounded-lg w-full px-4 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                            />
                                        </div>
                                        <div>
                                            <textarea 
                                            type="text"
                                            placeholder="Descricao do produto"
                                            className="border rounded-lg w-full px-4 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                            />
                                        </div>
                                        <div>
                                            <input 
                                            type="number" 
                                            placeholder="Preço"
                                            className="border rounded-lg w-full px-4 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                            />

                                        </div>

                                        <div>
                                            <select className="bg-white rounded-md p-2 border">
                                                <option value="">Selecione a categoria do produto</option>
                                                <option value="1">Feminino</option>
                                                <option value="2">Infantil</option>
                                                <option value="3">Masculino</option>
                                                <option value="4">Coleções</option>
                                            </select>
                                        </div>

                                        <div>
                                            <input 
                                            type="number" 
                                            placeholder="Estoque"
                                            className="border rounded-lg w-full px-4 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                            />
                                        </div>

                                        <div className="relative w-fit">
                                            <input 
                                            type="file" 
                                            id="fileUpload"
                                            className="hidden"
                                            />
                                            <label 
                                            htmlFor="fileUpload"
                                            className="bg-gray-300 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md cursor-pointer transtion duration-300"
                                            >
                                                Selecionar Imagem
                                            </label>
                                        </div>
                                            <button className="w-full py-3 bg-[#7886C7] cursor-pointer text-white font-semibold rounded-lg hover:bg-[#2D336B] transition">
                                                Adicionar Produto
                                            </button>
                                    </form>
                                </section> 
                            ) : (
                                <div className="w-full h-full flex justify-center items-center">
                                    <div className="flex flex-col justify-center items-center">
                                        <Image 
                                        src={information} 
                                        alt="Icone de informacao" 
                                        height={96} 
                                        width={96}
                                        />
                                        <p className="text-md md:text-lg text-black text-center">Clique nos icones a esquerda para ver informações do seu perfil ou pedido</p>
                                    </div>
                                </div>
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