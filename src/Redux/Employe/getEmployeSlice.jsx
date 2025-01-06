import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeService from "./getEmployeService";

const initialState = {
  employees: [],
  totalEmployees: 0,
  designationCounts: {
    PSA: 0,
    SSA: 0,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Async thunk for fetching employees
export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async (_, thunkAPI) => {
    try {
      const response = await employeeService.getEmployees();
      return response; // Assuming response contains totalEmployees, employees, designationCounts
    } catch (error) {
      const message = error.response ? error.response.data.message : error.message;
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const employeeSlice = createSlice({
  name: "getEmployees",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Employees Cases
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload.employees;
        state.totalEmployees = action.payload.totalEmployees;
        state.designationCounts = action.payload.designationCounts;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Failed to fetch employees";
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
