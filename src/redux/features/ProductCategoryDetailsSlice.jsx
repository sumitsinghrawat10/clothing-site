import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductCategoryDetails = createAsyncThunk(
  "productCategoryDetails/fetchProductCategoryDetails",
  async (productCategory, { rejectWithValue }) => {
    try {
        const response = await axios.get(
        `http://20.112.251.4/api/product_category/details`,
        {
          params: {
              product_category: productCategory,
          },
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        },
      );
      // const response = await api.get("/product_category/details", {
      //   params: {
      //     product_category: productCategory,
      //   },
      // });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch product category details",
      );
    }
  },
);

const ProductCategoryDetailsSlice = createSlice({
  name: "productCategoryDetails",
  initialState: {
    categoryDetailsData: null,
    categoryDetailsLoading: false,
    categoryDetailsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategoryDetails.pending, (state) => {
        state.categoryDetailsLoading = true;
        state.categoryDetailsError = null;
      })
      .addCase(fetchProductCategoryDetails.fulfilled, (state, action) => {
        state.categoryDetailsLoading = false;
        state.categoryDetailsData = action.payload;
      })
      .addCase(fetchProductCategoryDetails.rejected, (state, action) => {
        state.categoryDetailsLoading = false;
        state.categoryDetailsError = action.payload;
      });
  },
});

export default ProductCategoryDetailsSlice.reducer;
