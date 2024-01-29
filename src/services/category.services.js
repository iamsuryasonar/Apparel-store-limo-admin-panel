import axios from 'axios'
import { LOCAL_STORAGE_NAME, API_URL } from '../common/constants'

const getheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).accessToken}`,
    }
    return headers
}

const getMultipartheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).accessToken}`,
    }
    return { headers }
}

const getAllCategories = async () => {
    const response = await axios
        .get(API_URL + 'category/', { headers: getheaders() })
    return response.data.results
}

const addCategory = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);

    const response = await axios
        .post(
            API_URL + 'category/', formData, getMultipartheaders()
        )
    return response.data.results
}

const updateCategory = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("path", data.path);
    formData.append("isActive", data.isActive);
    formData.append("image", data.image);

    const response = await axios
        .put(
            API_URL + 'category/' + data.id, formData, getMultipartheaders()
        )
    return response.data.results
}

const categoryServices = {
    addCategory,
    getAllCategories,
    updateCategory
}

export default categoryServices;