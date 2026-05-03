import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchManagers = createAsyncThunk(
  "managers/fetchManagers",
  async (subregion = "US", { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("authToken");

      const response = await axios.get(
        `http://20.112.251.4/api/dashboard/managers/`,
        {
          params: {
            subregion,
          },
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch managers data",
      );
    }
  },
);

const managersSlice = createSlice({
  name: "managers",
  initialState: {
    managersData: null,
    managersLoading: false,
    managersError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.pending, (state) => {
        state.managersLoading = true;
        state.managersError = null;
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.managersLoading = false;
        state.managersData = action.payload;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.managersLoading = false;
        state.managersError = action.payload;
      });
  },
});

export default managersSlice.reducer;