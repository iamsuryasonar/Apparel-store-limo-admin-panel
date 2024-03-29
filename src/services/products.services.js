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

const getAllProducts = async (pagination_info) => {
    const response = await axios
        .get(API_URL + 'product/', {
            params: {
                page: pagination_info.page,
                limit: pagination_info.limit,
            }, headers: getheaders()
        },)
    return response.data.results
}

const get_a_product = async (id) => {
    const response = await axios
        .get(API_URL + 'product/' + id, { headers: getheaders() })
    return response.data.results
}

const getProductsByCategory = async (id) => {
    const response = await axios
        .get(API_URL + 'product/category/' + id, { headers: getheaders() })
    return response.data.results
}

const addProduct = async (data) => {
    const formData = new FormData();
    //product info
    formData.append("name", data.product.name);
    formData.append("description", data.product.description);
    formData.append("keyword", data.product.keyword);
    formData.append("tag", data.product.tag);
    formData.append("categoryId", data.product.categoryId);
    //color Variant name and thumbnail
    formData.append("colorVariantName", data.colorVariant.name);
    formData.append("colorVariantThumbnail", data.colorVariant.thumbnail);

    //color Variant images
    for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i].image);
    }

    for (let i = 0; i < data.sizeVariants.length; i++) {
        formData.append('sizeVariants', JSON.stringify(data.sizeVariants[i]));
    }

    const response = await axios
        .post(
            API_URL + 'product/', formData, getMultipartheaders()
        )
    return response.data
}

const add_color_size_variant = async (data) => {
    const formData = new FormData();
    //product info

    formData.append("productId", data.productId);
    //color Variant name and thumbnail
    formData.append("colorVariantName", data.colorVariant.name);
    formData.append("colorVariantThumbnail", data.colorVariant.thumbnail);

    //color Variant images
    for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i].image);
    }

    for (let i = 0; i < data.sizeVariants.length; i++) {
        formData.append('sizeVariants', JSON.stringify(data.sizeVariants[i]));
    }

    const response = await axios
        .put(
            API_URL + 'product/add_color_and_sizes', formData, getMultipartheaders()
        )
    return response.data.results
}

const toggleIsPublished = async (productId) => {
    const response = await axios
        .put(
            API_URL + 'product/toggle_is_published/' + productId, {}, { headers: getheaders() }
        )
    return response.data.results
}

const update_thumbnail = async (data) => {
    const formData = new FormData();

    formData.append("path", data.thumbnailPath);
    formData.append("thumbnail", data.image);

    const response = await axios
        .put(
            API_URL + 'product/update_thumbnail/' + data.colorVariantId, formData, getMultipartheaders()
        )
    return response.data.results
}

const update_image = async (data) => {
    const formData = new FormData();

    formData.append("filename", data.path);
    formData.append("image", data.image);

    const response = await axios
        .put(
            API_URL + 'product/update_image/' + data.imageId, formData, getMultipartheaders()
        )
    return response.data.results
}

const add_image = async (data) => {
    const formData = new FormData();

    formData.append("image", data.image);

    const response = await axios
        .post(
            API_URL + 'product/add_image/' + data.colorVariantId, formData, getMultipartheaders()
        )
    return response.data.results
}


const update_product_info = async (data) => {

    const formData = new FormData();
    //product info
    formData.append("name", data.product.name);
    formData.append("description", data.product.description);
    formData.append("keyword", data.product.keyword);
    formData.append("tag", data.product.tag);
    formData.append("categoryId", data.product.categoryId);

    const response = await axios
        .put(
            API_URL + 'product/product_info/' + data.productId, formData, getMultipartheaders()
        )
    return response.data.results
}



const add_size_variant = async (data) => {

    const formData = new FormData();
    //size variant info
    formData.append("name", data.sizeVariant.name);
    formData.append("stock", data.sizeVariant.stock);
    formData.append("mrp", data.sizeVariant.mrp);
    formData.append("selling_price", data.sizeVariant.selling_price);
    formData.append("status", data.sizeVariant.status);

    const response = await axios
        .post(
            API_URL + 'product/add_size/' + data.colorVariantId, formData, getMultipartheaders()
        )
    return response.data.results
}

const update_size_variant = async (data) => {

    const formData = new FormData();
    //size variant info
    formData.append("name", data.sizeVariant.name);
    formData.append("stock", data.sizeVariant.stock);
    formData.append("mrp", data.sizeVariant.mrp);
    formData.append("selling_price", data.sizeVariant.selling_price);
    formData.append("status", data.sizeVariant.status);

    const response = await axios
        .put(
            API_URL + 'product/update_size/' + data.sizeVariantId, formData, getMultipartheaders()
        )
    return response.data.results
}

const deleteProduct = async (id) => {
    const response = await axios
        .delete(API_URL + "product/" + id, getheaders())
    return response.data.results
}

const productsServices = {
    get_a_product,
    toggleIsPublished,
    getAllProducts,
    getProductsByCategory,
    addProduct,
    deleteProduct,
    add_color_size_variant,
    update_product_info,
    add_size_variant,
    update_size_variant,
    update_thumbnail,
    add_image,
    update_image,
}

export default productsServices;