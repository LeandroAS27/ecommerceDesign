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
        },
        sortProducts: (state, action) => {
            const option = action.payload
            if(option === 'a-z'){
                console.log('a-z funcionou') // colocar a logica do filtro pra quando for o filtro, pesquisar os produtos
                state.items.sort((a, b) => a.name.localeCompare(b.name))
            }else if(option === 'z-a'){
                state.items.sort((a, b) => b.name.localeCompare(a.name))
                console.log('z-a funcionou')
            }else if(option === 'lowest'){
                state.items.sort((a, b) => a.price - b.price)
                console.log('lowest funcionou')
            }else if(option === 'highest'){
                state.items.sort((a, b) => b.price - a.price)
                console.log('highest funcionou')
            }
        }
    }
})

export const {setProducts, addProducts, removeProduct, incrementQuantity, decrementQuantity, sortProducts} = productSlice.actions;
export const productReducer = productSlice.reducer;