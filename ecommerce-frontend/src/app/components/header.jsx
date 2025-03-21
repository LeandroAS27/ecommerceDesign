import Image from "next/image"
import like from '../../../public/icons8-gostar-96.png'
import cart from '../../../public/icons8-carrinho.png'
import person from '../../../public/icons8-pessoa.png'
import Link from "next/link"

const Header = () => {
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
                    <Image src={like} alt="Icone de coracao" width={24} height={24}/>
                    <Image src={person} alt="Icone de uma pessoa" width={24} height={24}/>
                    <Image src={cart} alt="Icone de um carrinho" width={24} height={24}/>
                </div>
            </header>
        </>
    )
}

export default Header;