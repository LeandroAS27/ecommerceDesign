const ModalCart = ({ onClose, isOpen }) => {
    return(
        <div className={`fixed inset-0 flex justify-end z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}>
            <div className="absolute inset-0 bg-black-700 bg-opacity-50 transition-opacity duration-300" onClick={onClose}/>
            
            {/* modal lateral */}

            <div className={`relative bg-[#EEEEEE] w-80 h-full shadow-lg p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <h2>Seu carrinho</h2>
                <button 
                onClick={onClose}
                className="absolute top-0 right-4 mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Fechar
                </button>

                <p>Itens no carrinho...</p>
            </div>
        </div>  
    )
}

export default ModalCart;