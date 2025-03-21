import ProductList from "./productList"

const Trending = () => {
    return(
        <section className="w-full flex flex-col items-center rounded mb-16">
            <h1 className="text-4xl mb-14">Trending Now</h1>

            <div className="mb-14">{/* produtos */}
                <ProductList/>
            </div>

            <button className="border rounded-full px-12 py-4 cursor-pointer">
                <span className="font-bold">Show All</span>
            </button>
        </section>
    )
}

export default Trending