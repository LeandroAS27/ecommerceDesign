import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.idproducts !== action.payload);
        },
        updateCartItem: (state, action) => {
            state.cart = state.cart.map(item => item.idproducts === action.payload.idproducts ? {...item, quantity: action.payload.quantity} : item)
        },
        increaseQuantityFromCart: (state, action) => {
            const product = state.cart.find(item => item.idproducts === action.payload)
            if(product){
                product.quantity = product.quantity + 1
            }
        },
        decreaseQuantityFromCart: (state, action) => {
            const product = state.cart.find(item => item.idproducts === action.payload)
            if(product){
                product.quantity = product.quantity > 0 ? product.quantity - 1 : product.quantity
            }
        }
    }
})

export const {addToCart, removeFromCart, updateCartItem, increaseQuantityFromCart, decreaseQuantityFromCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;