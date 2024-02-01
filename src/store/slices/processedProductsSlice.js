import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import ordersServices from "../../services/orders.services";
import { logout } from "./authSlice";
import { setLoading } from "./loadingSlice";

export const get_all_processed_products = createAsyncThunk(
    "orders/get_all_processed_products",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ordersServices.getAllProcessedOrders(data);
            return response.results;
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
)

export const update_order_status = createAsyncThunk(
    "orders/update_order_status",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ordersServices.updateOrderStatus(data);
            return response.results;
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
)

const initialState = { processed: null };

const processedProductsSlice = createSlice({
    name: "processed",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_all_processed_products.fulfilled, (state, action) => {
                    state.processed = action.payload;
                }).addCase(get_all_processed_products.rejected, (state, action) => {
                })
        },
});

const { reducer } = processedProductsSlice;
export default reducer;