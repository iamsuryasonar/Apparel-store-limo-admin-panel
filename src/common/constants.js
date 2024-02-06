const baseUrl = import.meta.env.VITE_BASE_URL;
// export const baseUrl = 'http://localhost:3001/admin/api/v1/';
export const API_URL = baseUrl + '/admin/api/v1/';
export const LOCAL_STORAGE_NAME = 'limoADMIN';

export const ORDERSTATUS = ['ORDERED', 'PROCCESSED', 'CANCELLED', 'TRANSIT', 'DELIVERED']

export const filterItems = {
    NEWEST_FIRST: "NEWEST_FIRST",
    OLDEST_FIRST: "OLDEST_FIRST"
}