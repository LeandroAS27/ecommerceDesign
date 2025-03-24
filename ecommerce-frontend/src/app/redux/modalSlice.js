import { createSlice } from "@reduxjs/toolkit";

//estado inicial
const initialState = {
    isModalOpen: false
}

const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isModalOpen = !state.isModalOpen;
        }
    }
})

export const {toggleCart} = modalSlice.actions;

export const modalCartReducer = modalSlice.reducer;