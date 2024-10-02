import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { RootState } from "../store";

interface User {
    name: string;
    email: string;
    bio: string;
    // Adicione outras propriedades aqui, se necessário
}

interface UserState {
    user: User | null;
    error: boolean | null;
    success: boolean;
    loading: boolean;
    message: string | null;
  }
  
  const initialState: UserState = {
    user: null,
    error: false,
    success: false,
    loading: false,
    message: null,
  };

 export const profile = createAsyncThunk("user/profile",
    async(user, thunkAPI) => {

        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await userService.profile(user, token)

        return data;


    }
 )



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
    }
})

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;