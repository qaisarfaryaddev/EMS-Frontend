import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const appLogin = createAsyncThunk('auth/appLogin', async (userData, thunkAPI) => {
  try {
    const response = await authService.appLogin(userData);
    return response.data; // assuming response contains user data
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    return thunkAPI.rejectWithValue({ message });  // Passing the error message
  }
});

export const authSlice = createSlice({
  name: "appAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(appLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(appLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Login Successful";  // Optional: Customize the success message
      })
      .addCase(appLogin.rejected, (state, action) => {
        state.isLoading = false;  // Make sure loading is false
        state.isError = true;
        state.message = action.payload?.message || "Login failed";  // Use the error message from the action
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
