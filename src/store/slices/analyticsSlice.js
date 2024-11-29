import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import categoryServices from "../../services/category.services";
import { logout } from "./authSlice";
import AnalyticsServices from "../../services/analytics.services";

export const get_analytics = createAsyncThunk(
    "category/get_analytics",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await AnalyticsServices.getAnalytics();
            return response;
        } catch (error) {
            if (error.response.data.code === 401) {
                thunkAPI.dispatch(logout());
            }
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

const initialState = { analytics: null };

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_analytics.fulfilled, (state, action) => {
                    state.analytics = action.payload;
                }).addCase(get_analytics.rejected, (state, action) => {
                })
        },
});

const { reducer } = analyticsSlice;
export default reducer;