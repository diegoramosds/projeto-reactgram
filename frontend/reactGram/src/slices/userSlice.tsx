import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//  const user = JSON.parse(localStorage.getItem("user") as string )
// interface User {
//    _id?: string; // ID do usuário (opcional)
//    name?: string; // Nome do usuário (opcional)
//    email?: string; // Email do usuário (opcional)
//    password: string; // Senha do usuário
//    confirmPassword?: string;
// }

// // interface AuthState {
// //    user: User | null; // Substitua por um tipo mais específico, se possível
// //    error: string | null; // Permitir que error seja uma string ou null
// //    success: boolean;
// //    loading: boolean;
//        message: null,

// // }

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null,
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    }
})

export const {resetMessage} = userSlice.actions;
export default userSlice;