import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import axios from "axios";
export const fetchProductCategory = createAsyncThunk(
  "productCategory/fetchProductCategory",
  async (_, { rejectWithValue }) => {
    try {
      const today = "2025-07-14";
      // const today = new Date().toISOString().split("T")[0];

      // const response = await api.get("/product_category", {
      //   params: {
      //     reporting_date: today,
      //   },
      // });
        const response = await axios.get(
        `http://20.112.251.4/api/product_category`,
        {
          params: {
           reporting_date: today,
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
        error.response?.data?.message ||
          "Failed to fetch product category data",
      );
    }
  },
);

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState: {
    categoryData: null,
    categoryLoading: false,
    categoryError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategory.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })
      .addCase(fetchProductCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchProductCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload;
      });
  },
});

export default productCategorySlice.reducer;
