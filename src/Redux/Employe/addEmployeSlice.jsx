import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeService from "./addEmploye.service"; 

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Async thunk for adding an employee
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employeeData, thunkAPI) => {
    try {
      const response = await employeeService.addEmploye(employeeData);
      return response.data; 
    } catch (error) {
      const message = error.response ? error.response.data.message : error.message;
      return thunkAPI.rejectWithValue({ message }); // Passing the error message
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Employee added successfully"; // Optional: Customize the success message
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.isLoading = false; // Ensure loading is false
        state.isError = true;
        state.message = action.payload?.message || "Failed to add employee"; // Use the error message from the action
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
