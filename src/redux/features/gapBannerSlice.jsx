
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGapBanner = createAsyncThunk(
  "gapBanner/fetchGapBanner",
  async (
    { material_id, region = "all" } = {},
    { getState, rejectWithValue },
  ) => {
    try {
   const token = getState().auth.token || localStorage.getItem("authToken");
      
      const response = await axios.get(
        `http://20.112.251.4/api/insights/gap-banner/`,
        {
          params: { material_id, region },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch gap banner data",
      );
    }
  },
);

const gapBannerSlice = createSlice({
  name: "gapBanner",
  initialState: {
    gapBannerData: null,
    gapBannerLoading: false,
    gapBannerError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGapBanner.pending, (state) => {
        state.gapBannerLoading = true;
        state.gapBannerError = null;
      })
      .addCase(fetchGapBanner.fulfilled, (state, action) => {
        state.gapBannerLoading = false;
        state.gapBannerData = action.payload;
      })
      .addCase(fetchGapBanner.rejected, (state, action) => {
        state.gapBannerLoading = false;
        state.gapBannerError = action.payload;
      });
  },
});

export default gapBannerSlice.reducer;
