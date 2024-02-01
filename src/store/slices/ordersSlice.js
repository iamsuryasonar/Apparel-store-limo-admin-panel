import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import ordersServices from "../../services/orders.services";
import { setLoading } from "./loadingSlice";
import { logout } from "./authSlice";

export const get_all_orders = createAsyncThunk(
    "orders/get_all_orders",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ordersServices.getAllOrders(data);
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

const initialState = { orders: null };

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_all_orders.fulfilled, (state, action) => {
                    state.orders = action.payload;
                }).addCase(get_all_orders.rejected, (state, action) => {
                })
        },
});

const { reducer } = ordersSlice;
export default reducer;