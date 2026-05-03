
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchManagerDetail = createAsyncThunk(
  "managerDetail/fetchManagerDetail",
  async ({ managerName, subregion = "US" }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("authToken");
      const encodedName = encodeURIComponent(managerName);

      // const response = await axios.post(
      //   `http://20.112.251.4/api/dashboard/managers/${encodedName}/?subregion=${subregion}`,
      //   {},
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      const response = await axios.get(
  `http://20.112.251.4/api/dashboard/managers/${encodedName}/?subregion=${subregion}`,
  {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  },
);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch manager detail",
      );
    }
  },
);

const managerDetailSlice = createSlice({
  name: "managerDetail",
  initialState: {
    managerDetailData: null,
    managerDetailLoading: false,
    managerDetailError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagerDetail.pending, (state) => {
        state.managerDetailLoading = true;
        state.managerDetailError = null;
      })
      .addCase(fetchManagerDetail.fulfilled, (state, action) => {
        state.managerDetailLoading = false;
        state.managerDetailData = action.payload;
      })
      .addCase(fetchManagerDetail.rejected, (state, action) => {
        state.managerDetailLoading = false;
        state.managerDetailError = action.payload;
      });
  },
});

export default managerDetailSlice.reducer;
