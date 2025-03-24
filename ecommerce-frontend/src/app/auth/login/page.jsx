"use client"

import { useState } from "react";
import Image from "next/image";
import Eye from '../../../../public/olho-visível.png';
import EyeClosed from '../../../../public/olho-fechado.png';
import Link from "next/link";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = (e) => {
        e.preventDefault()
        setShowPassword((prev) => !prev);
    }   

    const handleSubmit = () => {
        
    }

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#FDFAF6] to-[#F2E9E4]">
            <div className="w-full max-w-xl p-8 min-h-96 bg-[#FBF8EF] flex flex-col items-center justify-center rounded-xl shadow-2xl shadow-[#A9B5DF]/50 ">
                <h1 className="mb-6 text-3xl font-title font-bold text-center">eCommerceDesign</h1>
                <h3 className="mb-8 text-2xl font-sans text-center text-gray-700">Sign in</h3>

                <form className="space-y-6">
                    <div>
                        <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="p-2 border rounded-lg w-full px-4 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div className="relative">
                        <input 
                        type={`${showPassword ? "text" : "password"}`} 
                        placeholder="Password" 
                        className="w-full p-2 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <button 
                        className="absolute right-0 inset-y-0 flex items-center pr-3" 
                        onClick={handleShowPassword}>
                            <Image 
                            src={showPassword ? Eye : EyeClosed} 
                            alt="Mostrar senha"
                            width={24} 
                            height={24}
                            />
                        </button>
                    </div>

                    <button 
                    className="w-full py-3 bg-[#7886C7] cursor-pointer text-white font-semibold rounded-lg hover:bg-[#2D336B] transition"
                    onClick={handleSubmit}
                    >
                        Log in
                    </button>
                </form>

                <div className="mt-4 text-center w-full max-w-1/2">
                    <p className="text-gray-700 text-sm">Forgot your password?</p>
                    <p className="text-gray-400 mt-4">Don't Have an Account?</p>
                    <button className="w-full py-3 bg-[#EEEEEE] cursor-pointer font-semibold rounded-lg mt-4">
                        <Link href="/auth/register"><span className="text-gray-700">Create New Account</span></Link>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Login;