"use client"

import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setProducts } from '../redux/productSlice';
import Image from 'next/image';

const ProductList = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.items);

    useEffect(() => {
        const fetchProducts = async () =>{
            try {
                const response = await fetch('http://localhost:5000/products')
                const data = await response.json();
                dispatch(setProducts(data))
            } catch (error) {
                console.error("Erro ao buscar produtos", error)
            }
        }
        fetchProducts()
    }, [dispatch])

    return(
        <div className='grid grid-cols-3 gap-4'>
            {products.map((product) => (
                <div key={product.id} className='border p-4 rounded'>
                    <Image 
                    src={product.image} 
                    alt={product.title} 
                    className='w-full h-48 object-cover'
                    />
                    <h2 className='text-lg font-bold'>{product.title}</h2>
                    <p className='text-gray-700'>{product.price}</p>
                </div>
            ))}
        </div>
    )
}

export default ProductList;