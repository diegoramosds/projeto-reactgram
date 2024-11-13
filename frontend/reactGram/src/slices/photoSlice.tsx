import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import { reset } from "./authSlice";
import { RootState } from "../store";

interface Photo {
    _id: string;
    url: string;
    title: string;
    image: string | File;
    likes?: string[];
  }

  interface PhotoDataProps {
    id: string;
    title: string;
   
  }

interface InitialStateProps {
    photos: Array<Photo>,
    photo: Photo | object,
    error: boolean | string | null,
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
    async(photo: object, thunkAPI) => {

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

        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await photoService.deletePhoto(id, token)


         //Check errors
         if(data.errors) {
            return  thunkAPI.rejectWithValue(data.errors[0]);
           }
  
        return data;
    }
)
// Update photo

export const updatePhoto = createAsyncThunk("/photos/update",
    async(photoData: PhotoDataProps, thunkAPI) => {
        
        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await photoService.updatePhoto({title: photoData.title}, photoData.id, token);

          //Check errors
          if(data.errors) {
            return  thunkAPI.rejectWithValue(data.errors[0]);
           }
  
           return data;
    }
)


//get Photo
export const getPhotoById = createAsyncThunk("/photos/getphoto/",
    async(id: string | undefined, thunkAPI) => {

        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await photoService.getPhotoById(id, token);
        return data;
    }
)

// like a photo
export const likePhoto = createAsyncThunk("photo/like",
    async(id: string, thunkAPI) => {

        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await photoService.likePhoto(id, token)


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
        .addCase(updatePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(updatePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos.map((photo) => {
               if(photo._id === action.payload.photo.id) {
                return photo.title = action.payload.photo.title
               }
               return photo;
            });    

            state.message = action.payload.message;
        })
        .addCase(updatePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.photo = {};
        })
        .addCase(getPhotoById.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getPhotoById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
        })
        .addCase(likePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;  
            
            if ("likes" in state.photo && Array.isArray(state.photo.likes)) {
                state.photo.likes.push(action.payload.userId);
            }


            state.photos.map((photo) => {

                if(  "likes" in state.photo &&  photo._id === action.payload.photoId) {
                    state.photo.likes = state.photo.likes || [];
                    return state.photo.likes.push(action.payload.userId)
                }
            })
        })
        .addCase(likePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.photo = {};
        })
    }
})


export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer
