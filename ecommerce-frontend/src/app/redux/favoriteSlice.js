import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: []
};

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const product = action.payload
            const isFavorite = state.favorites.some((fav) => fav.idproducts === product.idproducts)
            
            if(isFavorite){
                state.favorites = state.favorites.filter((fav) => fav.idproducts !== product.idproducts)
            }else{
                state.favorites.push(product)
            }
        }
    }
})

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;