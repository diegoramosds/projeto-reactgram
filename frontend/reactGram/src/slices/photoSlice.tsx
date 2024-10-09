import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import { reset } from "./authSlice";

const initialState = {
    photos: [],
    photo:{},
    error: false,
    success: false,
    loading: false,
    message: null,
}

// functions

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },
    // extraReducers: (builder) => {
    //  builder.addCase()
    // }
})


export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer
