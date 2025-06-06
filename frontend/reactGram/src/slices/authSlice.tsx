import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user") as string);
interface User {
  _id: string;
  token?: string;
  name?: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}

interface AuthState {
  user: User | null;
  error: string | null | boolean;
  success: boolean;
  loading: boolean;
}


const initialState: AuthState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

interface UserProps {
  username: string;
  email: string;
  password: string;
}

//Register an user
export const register = createAsyncThunk(
  "auth/register",
  async (user: Partial<UserProps>, thunkAPI) => {
    const data = await authService.register(user);

    //Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

//Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

interface LoginProps {
  email: string;
  password: string;
}
//Sing in an user
export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginProps, thunkAPI) => {
    const data = await authService.login(user);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(action.payload));

        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
