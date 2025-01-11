import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import { reset } from "./authSlice";
import { RootState } from "../store";

interface commentDataProps {
    _id: string,
    id: string,
    commentId: string,
    photoId: string,
    photoImage: string,
    comment: string,
    userName: string,
    userId: string
}
interface Photo {
    _id: string;
    url: string;
    title: string;
    image: string | File;
    likes?: string[];
    comments?: commentDataProps[];
}
interface PhotoDataProps {
    id: string;
    title: string;
    comment: string;
}

interface InitialStateProps {
    photos: Array<Photo>,
    photo: Partial<Photo>,
    error: boolean | string | null,
    success: boolean,
    loading: boolean,
    message: null | string,
}

const initialState: InitialStateProps = {
    photos: [],
    photo:{
        comments: [],
    },
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
    async(photoData: Partial<PhotoDataProps>, thunkAPI) => {
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
// Add comments to a photo
export const comments = createAsyncThunk("/photo/comments",
    async(commentData: Partial<commentDataProps>, thunkAPI) => {

        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await photoService.comments({ comment: commentData.comment }, commentData.id, token);

        //Check errors
        if(data.errors) {
            return  thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    }
)

//Remove comment
export const removeComment = createAsyncThunk("/remove/comment",
    async(commentData: Partial<commentDataProps>, thunkAPI) => {

        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await photoService.removeComments(commentData.photoId, commentData.commentId, token)

        //Check errors
        if(data.errors) {
            return  thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    }
)

//Get all photos
export const getAllPhotos = createAsyncThunk("/getPhotos",
    async(_, thunkAPI) => {
        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await photoService.getAllPhotos(token)


        return data;
    }
)

//Search photo
export const searchPhoto = createAsyncThunk("photo/search",
    async(searchData: string | null, thunkAPI) => {
        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";

        const data = await photoService.searchPhoto(searchData, token);

         //Check errors
        if(data.errors) {
            return  thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
)

//Get all comments
export const getAllComments = createAsyncThunk("find/comments",
    async(id: string, thunkAPI) => {
        const token = (thunkAPI.getState() as RootState).auth.user?.token || "";


        const data = await photoService.getAllComments(id, token)

         //Check errors
        if(data.errors) {
            return  thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data
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
            const { photoId, likes } = action.payload;

            // Atualiza o estado da foto sendo exibida
            if (state.photo._id === photoId) {
            state.photo.likes = likes;
            }

            // Atualiza a lista de fotos no estado global
            state.photos = state.photos.map((photo) =>
            photo._id === photoId ? { ...photo, likes } : photo
            );

            state.message = action.payload.message;
        })
        .addCase(likePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.photo = {};
        })
        .addCase(comments.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = action.payload.message;

            if (!state.photo.comments) {
                state.photo.comments = [];
            }
            state.photo.comments.push(action.payload.comment);
        })
        .addCase(comments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(removeComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos = state.photos.filter((comments) => {
                return comments._id !== action.payload.id
            });
            state.message = action.payload.message;
        })
        .addCase(removeComment.pending, (state, action) => {
            if (state.photo?.comments) {
                state.photo.comments = state.photo.comments.filter(
                (comment) => comment._id !== action.meta.arg.commentId
                );
            }
        })
        .addCase(removeComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(getAllPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
        .addCase(getAllPhotos.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(searchPhoto.pending, (state) => {
            state.loading = false;
            state.error = false;
        })
        .addCase(searchPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
        .addCase(getAllComments.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getAllComments.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo.comments = action.payload;

            state.message = action.payload.message;
        })
        .addCase(getAllComments.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.error = action.payload as string;
        })
    }
})

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer