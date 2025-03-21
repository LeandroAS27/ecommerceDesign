const Footer = () => {
    return(
        <footer className="w-full h-96">
            <div className="w-full h-32 bg-[#1F1F1F] flex justify-between items-center p-8">
                <div className="flex flex-col">
                    <h1 className="text-[#EEEEEE] text-4xl">Be your Designer</h1>   
                    <p className="text-[#F5EDED] text-2xl">Dreams.</p>
                </div>

                <div className="flex space-x-4">
                    <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="py-2 px-4 text-left rounded bg-[#282828] text-[#EEEEEE] rounded-full"
                    />
                    <button 
                    className="bg-white px-8 rounded-full cursor-pointer"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="w-full h-full bg-[#141414]">
                <div className="grid grid-cols-4 items-center justify-items-center mx-auto gap-8 py-12">
                    {/* Men */}
                    <div>
                        <h1 className="text-[#EEEEEE] text-2xl mb-4">Men</h1>

                        <ul className="text-[#F5EDED]">
                            <li>Shirts & Polos</li>
                            <li>T-Shirts & Sweaters</li>
                        </ul>
                    </div>
                    {/* Women */}
                    <div>
                        <h1 className="text-[#EEEEEE] text-2xl mb-4">Women</h1>

                        <ul className="text-[#F5EDED]">
                            <li>Shirts & Polos</li>
                            <li>T-Shirts & Sweaters</li>
                        </ul>
                    </div>
                    {/* Kids */}
                    <div>
                        <h1 className="text-[#EEEEEE] text-2xl mb-4">Kids</h1>

                        <ul className="text-[#F5EDED]">
                            <li>Girls</li>
                            <li>Boys</li>
                        </ul>
                    </div>
                    {/* The Company */}
                    <div>
                        <h1 className="text-[#EEEEEE] text-2xl mb-4">The Company</h1>

                        <ul className="text-[#F5EDED]">
                            <li>My Order</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>  
            </div>
        </footer>
    )
}

export default Footer;