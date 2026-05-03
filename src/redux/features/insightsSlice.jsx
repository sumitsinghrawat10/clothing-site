// features/insightsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInsights = createAsyncThunk(
  "insights/fetchInsights",
  async (
    { level = "page", region = "all", web_type = "all" } = {},
    { getState, rejectWithValue },
  ) => {
    try {
     const token = getState().auth.token || localStorage.getItem("authToken");

      const response = await axios.get(`http://20.112.251.4/api/insights/`, {
        params: { level, region, web_type },
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch insights data",
      );
    }
  },
);

const insightsSlice = createSlice({
  name: "insights",
  initialState: {
    insightsData: null,
    insightsLoading: false,
    insightsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.insightsLoading = true;
        state.insightsError = null;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.insightsLoading = false;
        state.insightsData = action.payload;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.insightsLoading = false;
        state.insightsError = action.payload;
      });
  },
});

export default insightsSlice.reducer;
