"use client"

import ProductList from "./productList"
import { useState } from "react"

const Trending = () => {
    const [showAll, setShowAll] = useState(false);

    const handleShowAll = () => {
        setShowAll(true)
    }

    return(
        <section className="w-full flex flex-col items-center rounded mb-16">
            <h1 className="text-4xl mb-14">Trending Now</h1>

            <div className="mb-14">{/* produtos */}
                <ProductList showAll={showAll}/>
            </div>

            <button className="border rounded-full px-12 py-4 cursor-pointer" onClick={handleShowAll}>
                <span className="font-bold">Show All</span>
            </button>
        </section>
    )
}

export default Trending