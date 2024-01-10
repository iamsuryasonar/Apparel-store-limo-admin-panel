import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice';
import loadingReducer from './slices/loadingSlice';
import productsReducer from './slices/productSlice';
import categoriesReducer from './slices/categorySlice';

import { initialiseUser } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
        loading: loadingReducer,
        products: productsReducer,
        categories: categoriesReducer,
    },
});


store.dispatch(initialiseUser());

export default store;