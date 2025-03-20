import {createSlice} from '@reduxjs/toolkit'

//estado inicial dos produtos
const initialState = {
    items: [],
    loading: false,
    error: null,
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
    }
})

export const {setProducts, addProducts, removeProduct} = productSlice.actions;
export const productReducer = productSlice.reducer;