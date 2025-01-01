import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const appLogout = createAsyncThunk('auth/appLogout', async (_, thunkAPI) => {
  try {
    // Assuming authService has a logout function to handle logout API calls
    const response = await authService.Logout(); // API to destroy user session or token
    return response.data; // Optional: If you return a message or status
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    return thunkAPI.rejectWithValue({ message }); // Return error message for UI handling
  }
});

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    resetLogoutState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(appLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Logout Successful"; // Optional: Customize the success message
      })
      .addCase(appLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Logout failed"; 
      });
  }
});

export const { resetLogoutState } = logoutSlice.actions;
export default logoutSlice.reducer;
