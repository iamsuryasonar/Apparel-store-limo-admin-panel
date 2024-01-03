import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice';
import loadingReducer from './slices/loadingSlice';
import productsReducer from './slices/productSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
        loading: loadingReducer,
        products: productsReducer,
    },
})