import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import { reset } from "./authSlice";
import { RootState } from "../store";

interface Photo {
    _id: string;
    url: string;
    title: string;
    image: File | null
  }

interface InitialStateProps {
    photos: Array<Photo>,
    photo:  Partial<Photo>,
    error: false | string | null,
    success: boolean,
    loading: boolean,
    message: null | string,
}

const initialState: InitialStateProps = {
    photos: [],
    photo:{},
    error: false,
    success: false,
    loading: false,
    message: null,
}

// Publish user photo
export const publishPhoto = createAsyncThunk("photo/publish",
    async(photo: string, thunkAPI) => {

         const token = (thunkAPI.getState() as RootState).auth.user?.token || ""

         const data = await photoService.publishPhoto(photo, token)

         //Check errors
         if(data.errors) {
          return  thunkAPI.rejectWithValue(data.errors[0]);
         }

         return data;
    }
)

export const getUserPhotos = createAsyncThunk("photos/user",
    async(id: string, thunkAPI) => {


        const token = (thunkAPI.getState() as RootState).auth.user?.token || ""

        const data = await photoService.getUserPhotos(id, token)

        
         //Check errors
         if(data.errors) {
            return  thunkAPI.rejectWithValue(data.errors[0]);
           }
  
           return data;

    }
)
//Delete a photo
export const delePhoto = createAsyncThunk("/photos/delete",
    async(id: string, thunkAPI) => {

        const token = (thunkAPI.getState() as RootState).auth.user?.token

        const data = await photoService.deletePhoto(id, token)


         //Check errors
         if(data.errors) {
            return  thunkAPI.rejectWithValue(data.errors[0]);
           }
  
        return data;
    }
)

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(publishPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
            state.photos.unshift(state.photo as Photo);
            state.message = "Foto publicada com successo"
        })
        .addCase(publishPhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.photo = {};
        })
        .addCase(getUserPhotos.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getUserPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
        .addCase(delePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(delePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos = state.photos.filter((photo) => {
                return photo._id !== action.payload.id
            });    

            state.message = action.payload.message;
        })
        .addCase(delePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.photo = {};
        })
    }
})


export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer