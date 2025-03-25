"use client"

import Image from "next/image"
import like from '../../../public/icons8-gostar-96.png'
import cart from '../../../public/icons8-carrinho.png'
import person from '../../../public/icons8-pessoa.png'
import Link from "next/link"
import { useState } from "react"

const Header = ({onCartClick}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

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
            <header className="flex w-full justify-between my-8 font-title items-center">
                <h1 className="text-2xl font-bold">EcommerceDesign</h1>

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

                <div className="flex space-x-4">
                    <Link href="/favorites">                    
                        <Image src={like} alt="Icone de coracao" width={24} height={24}/>
                    </Link>

                    <div 
                    className="relative" 
                    onMouseEnter={() => setIsOpen(() => setIsOpen(true))} 
                    onMouseLeave={() => setIsOpen(false)}
                    >
                        <Image 
                        src={person} 
                        alt="Icone de uma pessoa" 
                        width={24} 
                        height={24}
                        />

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-[#F7F7F7] shadow-lg rounded-lg p-2 z-60">
                                <Link href={`${isLoggedIn > 0 ? '/profile' : '/auth/login'}`}>
                                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        {isLoggedIn > 0 ? 'Meu Perfil' : 'Login'}
                                    </button>
                                </Link>

                                {isLoggedIn && (
                                    <button 
                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100" 
                                    onClick={handleLogout}>
                                        Sair
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* <Link href="/auth/login">
                        <Image src={person} alt="Icone de uma pessoa" width={24} height={24}/>
                    </Link> */}

                    <Image src={cart} alt="Icone de um carrinho" width={24} height={24} onClick={onCartClick} className="cursor-pointer"/>
                </div>
            </header>
        </>
    )
}

export default Header;