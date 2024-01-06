import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import productServices from "../../services/product.services";
import { setLoading } from "./loadingSlice";

export const get_all_products = createAsyncThunk(
    "products/get_all_products",
    async (pagination_info, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.getAllProducts(pagination_info);
            return response;
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

export const add_product = createAsyncThunk(
    "products/add_product",
    async (product, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.addProduct(product);
            thunkAPI.dispatch(setMessage(response.message));
            return response.data;
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

export const add_color_and_its_size_variant = createAsyncThunk(
    "products/add_color_size_variant",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.add_color_size_variant(body);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
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
export const update_product_info = createAsyncThunk(
    "products/update_product_info",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.update_product_info(data);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
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

export const add_size_variant = createAsyncThunk(
    "products/add_size_variant",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.add_size_variant(data);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
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
export const update_size_variant = createAsyncThunk(
    "products/update_size_variant",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.update_size_variant(data);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
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
export const delete_product = createAsyncThunk(
    "products/delete_product",
    async (id, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.deleteProduct(id);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
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


const initialState = { products: null };

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_all_products.fulfilled, (state, action) => {
                    state.products = action.payload;
                }).addCase(get_all_products.rejected, (state, action) => {
                }).addCase(add_product.fulfilled, (state, action) => {
                    state.products = action.payload;
                }).addCase(add_product.rejected, (state, action) => {
                }).addCase(delete_product.fulfilled, (state, action) => {
                    state.products = action.payload;
                }).addCase(delete_product.rejected, (state, action) => {
                })
        },
});

const { reducer } = productSlice;
export default reducer;