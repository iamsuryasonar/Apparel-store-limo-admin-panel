import axios from 'axios'
import { LOCAL_STORAGE_NAME, API_URL } from '../common/constants'


const getheaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).accessToken}`,
    }
    return headers
}

const getAllProducts = async (pagination_info) => {

    const response = await axios
        .get(API_URL + 'product/', {
            params: {
                page: pagination_info.page,
                limit: pagination_info.limit,
            }, headers: getheaders()
        },)
    return response.data
}
const getAProduct = async (id) => {
    const response = await axios
        .get(API_URL + 'product/' + id, getheaders())
    return response.data
}
const getProductsByCategory = async (id) => {
    const response = await axios
        .get(API_URL + 'product/category/' + id, getheaders())
    return response.data
}

const addProduct = async (body) => {
    const response = await axios
        .post(
            API_URL + 'product/', body, getheaders()
        )
    return response.data
}
const updateProduct = async (body, id) => {
    const response = await axios
        .put(
            API_URL + 'product/' + id, body, getheaders()
        )
    return response.data
}

const deleteProduct = async (id) => {
    const response = await axios
        .delete(API_URL + "product/" + id, getheaders())
    return response.data
}

const productServices = {
    getAProduct,
    getAllProducts,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
}

export default productServices;