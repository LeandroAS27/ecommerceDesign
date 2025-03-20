import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from './productSlice';
import { Provider } from "react-redux"


export const store = configureStore({
    reducer: {
        products: productReducer,
    }
})