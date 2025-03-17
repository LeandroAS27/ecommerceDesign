import Image from "next/image"
import like from '../../../public/icons8-gostar-96.png'
import cart from '../../../public/icons8-carrinho.png'
import person from '../../../public/icons8-pessoa.png'

const Header = () => {
    return(
        <>
            <header className="flex w-full justify-between my-8 font-title items-center">
                <h1 className="text-2xl font-bold">EcommerceDesign</h1>

                <nav className="flex space-x-4 list-none">
                    <li>Women</li>
                    <li>Men</li>
                    <li>Kids</li>
                    <li>Collections</li>
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