import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import categoryServices from "../../services/category.services";
import { logout } from "./authSlice";

export const get_all_categories = createAsyncThunk(
    "category/get_all_categories",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await categoryServices.getAllCategories();
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

export const add_category = createAsyncThunk(
    "category/add_category",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await categoryServices.addCategory(data);
            thunkAPI.dispatch(get_all_categories());
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


export const update_category = createAsyncThunk(
    "category/update_category",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await categoryServices.updateCategory(data);
            thunkAPI.dispatch(get_all_categories());
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