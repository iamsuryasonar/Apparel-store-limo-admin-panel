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

const getAllOrders = async (data) => {
    const response = await axios
        .get(API_URL + 'order/', {
            params: {
                page: data.pageNo,
                limit: data.limit,
                filter: data.filterInfo,
            }, headers: getheaders()
        },)
    return response.data
}

const getAnOrder = async (id) => {
    const response = await axios
        .get(API_URL + 'order/' + id, {
            headers: getheaders()
        },)
    return response.data
}

const getAllProcessedOrders = async (data) => {
    const response = await axios
        .get(API_URL + 'order/status/' + 'PROCESSED', {
            params: {
                page: data.pageNo,
                limit: data.limit,
            }, headers: getheaders()
        },)
    return response.data
}

const getAllCancelledOrders = async (data) => {
    const response = await axios
        .get(API_URL + 'order/status/' + 'CANCELLED', {
            params: {
                page: data.pageNo,
                limit: data.limit,
            }, headers: getheaders()
        },)
    return response.data
}

const getAllOrderedOrders = async (data) => {

    const response = await axios
        .get(API_URL + 'order/status/' + 'ORDERED', {
            params: {
                page: data.pageNo,
                limit: data.limit,
            }, headers: getheaders()
        },)
    return response.data
}

const getAllDeliveredOrders = async (data) => {
    const response = await axios
        .get(API_URL + 'order/status/' + "DELIVERED", {
            params: {
                page: data.pageNo,
                limit: data.limit,
            }, headers: getheaders()
        },)
    return response.data
}

const getAllTransitOrders = async (data) => {
    const response = await axios
        .get(API_URL + 'order/status/' + "TRANSIT", {
            params: {
                page: data.pageNo,
                limit: data.limit,
            }, headers: getheaders()
        },)
    return response.data
}


const updateOrderStatus = async (data) => {
    const response = await axios
        .put(
            API_URL + 'order/status/' + data.id, { status: data.status }, { headers: getheaders() }
        )
    return response.data.results
}

const ordersServices = {
    getAllOrders,
    updateOrderStatus,
    getAllOrderedOrders,
    getAllProcessedOrders,
    getAllCancelledOrders,
    getAllDeliveredOrders,
    getAllTransitOrders,
    getAnOrder,
}

export default ordersServices;