"use client"

//react
import { useEffect, useState } from 'react';

//redux
import {useDispatch, useSelector} from 'react-redux';
import { setProducts } from '../redux/productSlice';

//images
import Image from 'next/image';
import like from '../../../public/icons8-gostar-96.png';
import liked from '../../../public/icons8-gostar-96 (1).png';
import noImage from '../../../public/image-no-image.jpg';

const ProductList = ({showAll}) => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.items);
    const [hovered, setHovered] = useState({});

    

    const handleMouseEnter = (id) => {
        setHovered((prevState) => ({...prevState, [id]: true}))
    }

    const handleMouseLeave = (id) => {
        setHovered((prevState) => ({...prevState, [id]: false}))
    }

    

    useEffect(() => {
        const fetchProducts = async () =>{
            try {
                const response = await fetch('http://localhost:5000/products')
                const data = await response.json();
                console.log(data)

                const showProducts = showAll ? data.result : data.result.slice(0, 6)
                dispatch(setProducts(showProducts))
            } catch (error) {
                console.error("Erro ao buscar produtos", error)
            }
        }
        fetchProducts()

    }, [dispatch, showAll])
    
    console.log(products)
    
    return(
        <div className='grid grid-cols-3 gap-4'>
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.idproducts} className='relative rounded'>
                        <Image 
                        src={product.image_url ? product.image_url : noImage} //preciso configurar o multer e subir imagens no servidor de acordo com o produto
                        alt={product.name} 
                        className='w-full h-48 object-cover'
                        width={32}
                        height={32}
                        />
                        <h2 className='text-lg font-bold'>{product.name}</h2>
                        <p className='text-gray-700'>R$ {product.price.toFixed(2)}</p>
                        <Image 
                        src={hovered[product.idproducts] ? liked : like} 
                        alt='Botao de gostar'
                        width={46}
                        height={32}
                        className='absolute top-4 right-4 bg-[#EFEFEF]/50 rounded-full p-2 cursor-pointer'
                        onMouseEnter={() => handleMouseEnter(product.idproducts)}
                        onMouseLeave={() => handleMouseLeave(product.idproducts)}
                        />
                    </div>
                ))
            ) : (
                <p>Carregando Produtos...</p>
            )}
        </div>
    )
}

export default ProductList;