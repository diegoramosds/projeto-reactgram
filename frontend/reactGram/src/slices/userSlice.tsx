import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { RootState } from '../store';

interface User {
    _id: string ,
    name: string;
    email: string;
    bio: string;
    profileImage: string;
    followers: Partial<FollowersProps>[];
}

interface FollowersProps {
    userId?: string,
    followers?: string[],
    userName?: string,
    userImage?: string,
}

interface UserState {
    user: User | null ;
    error: string | null | boolean;
    success: boolean;
    loading: boolean;
    message: string | null;
    followers:FollowersProps[];
}

const initialState: UserState = {
    user: null,
    error: null,
    success: false,
    loading: false,
    message: null,
    followers: [],
};

export const profile = createAsyncThunk("user/profile",
    async(user, thunkAPI) => {

        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await userService.profile(user, token)
        
        return data;
    }
 )

 export const updateProfile = createAsyncThunk("user/update", 
    async(user: FormData, thunkAPI) => {
        const token = (thunkAPI.getState() as RootState).auth.user?.token || ""

        const data = await userService.update(user, token)
        // Check errors

        if(data.erros) {
            return thunkAPI.rejectWithValue(data.errors[0])
         }

        return data;
    }
 )

 //Get user details
 export const getUserDetails = createAsyncThunk("user/get",
    async(id: string) => {
     const data = await userService.getUserDetails(id)
     return data;
    }
 )

 //Starting user
 export const followingUser = createAsyncThunk("/folowers",
    async(id: string, thunkAPI) => {
        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await userService.followingUser(id, token)

        if(data.erros) {
            return thunkAPI.rejectWithValue(data.errors[0])
         }
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
            state.error = false;
        })
        .addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            state.message = "Usuário atualizado com sucesso!";
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.user = null;
        }).addCase(getUserDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(followingUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            state.followers.push(action.payload.followers)

            state.message = action.payload.message;
        })
        .addCase(followingUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.user = null;
        })
    }
})

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;