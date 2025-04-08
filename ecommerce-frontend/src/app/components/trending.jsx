"use client"

import ProductList from "./productList"
import { useState } from "react"

const Trending = () => {
    const [showAll, setShowAll] = useState(false);

    const handleShowAll = () => {
        setShowAll(!showAll)
    }

    return(
        <section className="w-full flex flex-col items-center rounded mb-16">
            <h1 className="text-3xl md:text-4xl mb-14">Trending Now</h1>

            <div className="mb-14">{/* produtos */}
                <ProductList showAll={showAll}/>
            </div>

            <button className="border rounded-full px-6 py-4 md:px-12 md:py-4 cursor-pointer" onClick={handleShowAll}>
                <span className="font-bold">Show All</span>
            </button>
        </section>
    )
}

export default Trending