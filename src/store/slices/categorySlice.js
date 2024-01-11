import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import productsServices from "../../services/products.services";
import { setLoading } from "./loadingSlice";


export const get_all_categories = createAsyncThunk(
    "products/get_all_categories",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.getAllCategories();
            return response.categories;
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
);

const initialState = { categories: null };

const categorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_all_categories.fulfilled, (state, action) => {
                    state.categories = action.payload;
                }).addCase(get_all_categories.rejected, (state, action) => {
                })
        },
});

const { reducer } = categorySlice;
export default reducer;