import {createSlice} from '@reduxjs/toolkit'

//estado inicial dos produtos
const initialState = {
    items: [],
    loading: false,
    error: null,
    message: "Estou funcionando"
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        addProducts: (state, action) => {
            state.items.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.items = state.items.filter(product => product.id !== action.payload)
        },
        incrementQuantity: (state, action) => {
            const product = state.items.find(item => item.idproducts == action.payload)
            if(product){
                product.stock = (product.stock || 0 ) + 1
            }
        },
        decrementQuantity: (state, action) => {
            const product = state.items.find(item => item.idproducts == action.payload)
            if(product){
                product.stock = product.stock > 0 ? product.stock - 1 : 0;
            }
        }
    }
})

export const {setProducts, addProducts, removeProduct, incrementQuantity, decrementQuantity} = productSlice.actions;
export const productReducer = productSlice.reducer;