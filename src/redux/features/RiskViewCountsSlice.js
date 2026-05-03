import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRiskViewCounts = createAsyncThunk(
    "riskViewCounts/fetchRiskViewCounts",
    async ({ snapshot_date, subregion }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://20.112.251.4/api/risk-view-counts/`,
                {
                    params: {
                        snapshot_date,
                        subregion,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch risk view counts"
            );
        }
    }
);

const RiskViewCountsSlice = createSlice({
    name: "riskViewCounts",
    initialState: {
        riskViewCountsData: null,
        riskViewCountsLoading: false,
        riskViewCountsError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRiskViewCounts.pending, (state) => {
                state.riskViewCountsLoading = true;
                state.riskViewCountsError = null;
            })
            .addCase(fetchRiskViewCounts.fulfilled, (state, action) => {
                state.riskViewCountsLoading = false;
                state.riskViewCountsData = action.payload;
            })
            .addCase(fetchRiskViewCounts.rejected, (state, action) => {
                state.riskViewCountsLoading = false;
                state.riskViewCountsError = action.payload;
            });
    },
});

export default RiskViewCountsSlice.reducer;