import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dashboardCardReducer from './features/dashboardCardSlice';
import managersReducer from "./features/managersSlice";
import managerDetailReducer from "./features/managerDetailSlice";
import insightsReducer from "./features/insightsSlice";
import gapBannerReducer from "./features/gapBannerSlice";
import productCategoryReducer from "./features/ProductCategorySlice";
import ProductCategoryDetailsSlice from "./features/ProductCategoryDetailsSlice";
import RiskViewCountsSlice from "./features/RiskViewCountsSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardCardReducer,
    managers: managersReducer,
    managerDetail: managerDetailReducer,
    insights: insightsReducer,
    gapBanner: gapBannerReducer,
    productCategory: productCategoryReducer,
    productCategoryDetails: ProductCategoryDetailsSlice,
    riskViewCounts: RiskViewCountsSlice,
  },
});