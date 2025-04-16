"use client"

//images
import Image from "next/image"
import like from '../../../public/icons8-gostar-96.png'
import cartIcon from '../../../public/icons8-carrinho.png'
import person from '../../../public/icons8-pessoa.png'

//react
import Link from "next/link"
import { useState } from "react"

//redux
import { useDispatch, useSelector } from "react-redux"


const Header = ({onCartClick}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)

    useState(() => {
        if(typeof window !== 'undefined'){
            const token = localStorage.getItem('token')
            setIsLoggedIn(!!token);
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        alert("deslogado com sucesso") 
        window.location.reload()    
    }

    return(
        <>
            <header className="flex flex-col md:flex-row w-full justify-between my-8 font-title items-center space-y-2 md:space-y-0">
                <h1 className="text-2xl font-bold hover:scale-105 transition duration-300"><Link href='/'>EcommerceDesign</Link></h1>

                <nav className="flex space-x-4 list-none">
                    <Link href="/women">
                        <span className="hover:text-red-500 transition duration-300">Women</span>
                    </Link>
                    <Link href="/men">
                        <span className="hover:text-red-500 hover:scale-120 transition duration-300">Men</span>
                    </Link>
                    <Link href="/kids">
                        <span className="hover:text-red-500 hover:scale-120 transition duration-300">Kids</span>
                    </Link>
                    <Link href="/collections">
                        <span className="hover:text-red-500 hover:scale-120 transition duration-300">Collections</span>
                    </Link>
                </nav>

                <div className="flex space-x-4 items-center">
                    <Link href="/favorites">                    
                        <Image src={like} alt="Icone de coracao" width={24} height={24}/>
                    </Link>

                    <div 
                    className="relative" 
                    onMouseEnter={() => setIsOpen(() => setIsOpen(true))} 
                    onMouseLeave={() => setIsOpen(false)}
                    onClick={() => setIsOpen(true)}
                    >
                        <Image 
                        src={person} 
                        alt="Icone de uma pessoa" 
                        width={24} 
                        height={24}
                        className=""
                        />

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-[#F7F7F7] shadow-lg rounded-lg p-2 z-60">
                                <Link href={`${isLoggedIn > 0 ? '/profile' : '/auth/login'}`}>
                                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        {isLoggedIn > 0 ? 'Meu Perfil' : 'Login'}
                                    </button>
                                </Link>

                                {isLoggedIn && (
                                    <button 
                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer" 
                                    onClick={handleLogout}>
                                        Sair
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="relative pr-4 py-4">
                        <Image 
                        src={cartIcon} 
                        alt="Icone de um carrinho" 
                        width={24} 
                        height={24} 
                        onClick={onCartClick} 
                        className="cursor-pointer"
                        />
                        <div className="absolute top-0 right-0 bg-black w-5 h-5 px-2 py-2 flex items-center justify-center text-xs rounded-full">
                            <p className="text-white font-bold">{cart.length}</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;