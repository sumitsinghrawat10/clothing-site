// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from '../api'

// export const fetchDashboardCards = createAsyncThunk(
//   "dashboard/fetchCards",
//   async (_, { rejectWithValue }) => {
//     try {
//       // const today = new Date().toISOString().split("T")[0];

//       const today ="2025-07-14"
//       const response = await api.get("/dashboard/", {
//         params: {
//           snapshot_date: today,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch dashboard data"
//       );
//     }
//   }
// );

// const dashboardCardSlice = createSlice({
//   name: "dashboard",
//   initialState: {
//     cardData: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDashboardCards.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDashboardCards.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cardData = action.payload;
//       })
//       .addCase(fetchDashboardCards.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default dashboardCardSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardCards = createAsyncThunk(
  "dashboard/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const today = "2025-07-14";

      const response = await axios.get(
        "http://20.112.251.4/api/dashboard/",
        {
          params: {
            snapshot_date: today,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard data"
      );
    }
  }
);

const dashboardCardSlice = createSlice({
  name: "dashboard",
  initialState: {
    cardData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cardData = action.payload;
      })
      .addCase(fetchDashboardCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardCardSlice.reducer;