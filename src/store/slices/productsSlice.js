import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import productsServices from "../../services/products.services";
import { setLoading } from "./loadingSlice";
import { logout } from "./authSlice";

export const get_all_products = createAsyncThunk(
    "products/get_all_products",
    async (pagination_info, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.getAllProducts(pagination_info);
            return response;
        } catch (error) {
            if (error.response.data.code === 401) {
                thunkAPI.dispatch(logout());
            }
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
export const get_a_product = createAsyncThunk(
    "products/get_a_product",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.get_a_product();
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

export const add_product = createAsyncThunk(
    "products/add_product",
    async (product, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.addProduct(product);
            return response.data;
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

export const toggleIsPublished = createAsyncThunk(
    "products/toggleIsPublished",
    async (productId, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.toggleIsPublished(productId);
            return response.data;
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
export const add_color_and_its_size_variant = createAsyncThunk(
    "products/add_color_size_variant",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.add_color_size_variant(body);
            return response.data;
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
export const update_product_info = createAsyncThunk(
    "products/update_product_info",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.update_product_info(data);
            return response.data;
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

export const add_size_variant = createAsyncThunk(
    "products/add_size_variant",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.add_size_variant(data);
            return response.data;
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
export const update_size_variant = createAsyncThunk(
    "products/update_size_variant",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.update_size_variant(data);
            return response.data;
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

export const update_thumbnail = createAsyncThunk(
    "products/update_thumbnail",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.update_thumbnail(data);
            return response.data;
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
export const update_image = createAsyncThunk(
    "products/update_image",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.update_image(data);
            return response.data;
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
export const add_image = createAsyncThunk(
    "products/add_image",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.add_image(data);
            return response.data;
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
export const delete_product = createAsyncThunk(
    "products/delete_product",
    async (id, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await productsServices.deleteProduct(id);
            return response.data;
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


const initialState = { products: null };

const productsSlice = createSlice({
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
                }).addCase(toggleIsPublished.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(toggleIsPublished.rejected, (state, action) => {
                }).addCase(add_color_and_its_size_variant.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(add_color_and_its_size_variant.rejected, (state, action) => {
                }).addCase(update_product_info.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(update_product_info.rejected, (state, action) => {
                }).addCase(add_size_variant.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(add_size_variant.rejected, (state, action) => {
                }).addCase(update_size_variant.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(update_size_variant.rejected, (state, action) => {
                }).addCase(update_thumbnail.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(update_thumbnail.rejected, (state, action) => {
                }).addCase(update_image.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(update_image.rejected, (state, action) => {
                }).addCase(add_image.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(add_image.rejected, (state, action) => {
                }).addCase(delete_product.fulfilled, (state, action) => {
                    // state.products = action.payload;
                }).addCase(delete_product.rejected, (state, action) => {
                })
        },
});

const { reducer } = productsSlice;
export default reducer;