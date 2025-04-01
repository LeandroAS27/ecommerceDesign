import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from './productSlice';
import { Provider } from "react-redux"
import { modalCartReducer } from './modalSlice';
import { cartReducer } from './cartSlice';
import favoritesReducer from './favoriteSlice'


export const store = configureStore({
    reducer: {
        products: productReducer,
        modalCart: modalCartReducer,
        cart: cartReducer,
        favorites: favoritesReducer
    }
})