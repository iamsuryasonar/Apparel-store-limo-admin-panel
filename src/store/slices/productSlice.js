import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import productServices from "../../services/product.services";
import { setLoading } from "./loadingSlice";

export const get_a_product = createAsyncThunk(
    "product/get_a_product",
    async (id, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.get_a_product(id);
            thunkAPI.dispatch(setMessage(response.message));
            return response.results.product;
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

export const toggleIsPublished = createAsyncThunk(
    "product/toggleIsPublished",
    async (productId, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.toggleIsPublished(productId);
            thunkAPI.dispatch(setMessage(response.message));
            thunkAPI.dispatch(get_a_product(productId));
            return response.results.product;
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
    "product/add_color_size_variant",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.add_color_size_variant(body);
            thunkAPI.dispatch(setMessage(response.message));
            thunkAPI.dispatch(get_a_product(body.productId));
            return response.results.product;
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
    "product/update_product_info",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.update_product_info(data);
            thunkAPI.dispatch(setMessage(response.message));
            thunkAPI.dispatch(get_a_product(data.productId));
            return response.results.product;
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
    "product/add_size_variant",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.add_size_variant(data);
            thunkAPI.dispatch(setMessage(response.message));
            thunkAPI.dispatch(get_a_product(data.productId));
            return response.results.product;
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
    "product/update_size_variant",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.update_size_variant(data);
            thunkAPI.dispatch(setMessage(response.message));
            thunkAPI.dispatch(get_a_product(data.productId));
            return response.results.product;
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

export const update_thumbnail = createAsyncThunk(
    "product/update_thumbnail",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.update_thumbnail(data);
            thunkAPI.dispatch(setMessage(response.message));
            thunkAPI.dispatch(get_a_product(data.productId));
            return response.results.product;
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
export const update_image = createAsyncThunk(
    "product/update_image",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.update_image(data);
            thunkAPI.dispatch(setMessage(response.message));
            thunkAPI.dispatch(get_a_product(data.productId));
            return response.results.product;
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
export const add_image = createAsyncThunk(
    "product/add_image",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productServices.add_image(data);
            thunkAPI.dispatch(setMessage(response.message));
            thunkAPI.dispatch(get_a_product(data.productId));
            return response.results.product;
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


const initialState = { product: null };

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_a_product.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(get_a_product.rejected, (state, action) => {
                }).addCase(toggleIsPublished.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(toggleIsPublished.rejected, (state, action) => {
                }).addCase(add_color_and_its_size_variant.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(add_color_and_its_size_variant.rejected, (state, action) => {
                }).addCase(update_product_info.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(update_product_info.rejected, (state, action) => {
                }).addCase(add_size_variant.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(add_size_variant.rejected, (state, action) => {
                }).addCase(update_size_variant.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(update_size_variant.rejected, (state, action) => {
                }).addCase(update_thumbnail.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(update_thumbnail.rejected, (state, action) => {
                }).addCase(update_image.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(update_image.rejected, (state, action) => {
                }).addCase(add_image.fulfilled, (state, action) => {
                    state.product = action.payload;
                }).addCase(add_image.rejected, (state, action) => {
                })
        },
});

const { reducer } = productSlice;
export default reducer;