import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice';
import loadingReducer from './slices/loadingSlice';
import productReducer from './slices/productSlice';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categorySlice';
import ordersReducer from './slices/ordersSlice';
import cancelledReducer from './slices/cancelledProductsSlice';
import deliveredReducer from './slices/deliveredProductsSlice';
import orderedReducer from './slices/orderedProductsSlice';
import transitReducer from './slices/transitProductsSlice';
import processedReducer from './slices/processedProductsSlice';
import orderReducer from './slices/orderSlice'

import { initialiseUser } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
        loading: loadingReducer,
        product: productReducer,
        products: productsReducer,
        categories: categoriesReducer,
        orders: ordersReducer,
        cancelled: cancelledReducer,
        delivered: deliveredReducer,
        ordered: orderedReducer,
        transit: transitReducer,
        processed: processedReducer,
        order: orderReducer
    },
});

store.dispatch(initialiseUser());

export default store;