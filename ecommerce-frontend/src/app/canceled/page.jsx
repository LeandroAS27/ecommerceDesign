import Link from "next/link";

const Canceled = () => {
    return(
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <h1 className="text-3xl font-bold mb-4 text-red-400">Erro no pagamento!</h1>
            <Link href='/' className="hover:underline text-blue-500">Voltar para a loja</Link>
        </div>
    )
}

export default Canceled;