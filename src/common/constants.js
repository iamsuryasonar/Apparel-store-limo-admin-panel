const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_BASE_URL : "http://localhost:3001";

export const API_URL = baseUrl + '/api/v1/';
export const LOCAL_STORAGE_NAME = 'limoADMIN';

export const ORDERSTATUS = ['ORDERED', 'PROCESSED', 'CANCELLED', 'TRANSIT', 'DELIVERED']

export const PRODUCT_TAG = ['Popular', 'Most purchased', 'New arrival'];

export const GENDERS = ['Male', 'Female', 'Unisex'];

export const filterItems = {
    NEWEST_FIRST: "NEWEST_FIRST",
    OLDEST_FIRST: "OLDEST_FIRST"
}