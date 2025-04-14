import Link from "next/link";

const Success = () => {
    return(
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1 className="text-3xl font-bold">Pagamento Aprovado!</h1>
            <p className="mt-4">Obrigado pela sua compra.</p>
            <Link href='/' className="text-blue-500 hover:underline">Voltar para a loja</Link>
        </div>
    )
}

export default Success;