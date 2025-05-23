"use client"

//react
import { useEffect } from 'react';

//redux
import {useDispatch, useSelector} from 'react-redux';
import { setProducts } from '../redux/productSlice';
import { toggleFavorite } from '../redux/favoriteSlice';

//images
import Image from 'next/image';
import like from '../../../public/icons8-gostar-96.png';
import liked from '../../../public/icons8-gostar-96 (1).png';
import noImage from '../../../public/image-no-image.jpg';
import { useRouter } from 'next/navigation';

const ProductList = ({showAll}) => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.items);
    const favorites = useSelector((state) => state.favorites.favorites)
    const router = useRouter()

    const handleBuy = (id, product) => {
        localStorage.setItem('SelectedProduct', JSON.stringify(product))

        router.push(`/products/${id}`)
    }

    useEffect(() => {
        const fetchProducts = async () =>{
            try {
                const response = await fetch('http://localhost:5000/products')
                const data = await response.json();

                const showProducts = showAll ? data.result : data.result.slice(0, 6)
                dispatch(setProducts(showProducts))
            } catch (error) {
                console.error("Erro ao buscar produtos", error)
            }
        }
        fetchProducts()
        
        
    }, [dispatch, showAll])
    
    
    const handleFavorite = (product) => {
        dispatch(toggleFavorite(product))
    }


    
    return(
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            {products.length > 0 ? (
                products.map(product => {
                    const isFavorited = favorites.some((fav) => fav.idproducts === product.idproducts)
                    return(
                        <div key={product.idproducts} className='relative rounded flex flex-col justify-center items-center space-y-2 aspect-[3/3]'>
                            <Image 
                            src={`http://localhost:5000/media/${product.image_url}` ? `http://localhost:5000/media/${product.image_url}` : noImage}
                            alt={product.name} 
                            className='w-full h-full object-cover rounded cursor-pointer'
                            width={200}
                            height={100}
                            onClick={() => handleBuy(product.idproducts, product)}
                            />
                            <h2 className='text-lg font-bold'>{product.name}</h2>
                            <p className='text-gray-700'>R$ {product.price.toFixed(2)}</p>
                            <Image 
                            src={isFavorited ? liked : like} 
                            alt='Botao de gostar'
                            width={46}
                            height={32}
                            className='absolute top-4 right-4 bg-[#EFEFEF]/50 rounded-full p-2 hover:scale-110 transition duration-300 cursor-pointer'
                            onClick={() => handleFavorite(product)}
                            />
                        </div>
                    )
                })
            ) : (
                <p>Carregando Produtos...</p>
            )}
        </div>
    )
}

export default ProductList;