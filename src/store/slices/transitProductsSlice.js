import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import ordersServices from "../../services/orders.services";
import { setLoading } from "./loadingSlice";

export const get_all_transit_products = createAsyncThunk(
    "orders/get_all_transit_products",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ordersServices.getAllTransitOrders(data);
            thunkAPI.dispatch(setMessage(response.message));
            return response.results;
        } catch (error) {
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

const initialState = { transit: null };

const transitProductsSlice = createSlice({
    name: "transit",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_all_transit_products.fulfilled, (state, action) => {
                    state.transit = action.payload;
                }).addCase(get_all_transit_products.rejected, (state, action) => {
                })
        },
});

const { reducer } = transitProductsSlice;
export default reducer;