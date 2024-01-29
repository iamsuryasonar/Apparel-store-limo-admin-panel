import axios from 'axios';
import { API_URL, LOCAL_STORAGE_NAME } from '../common/constants'


let headersList = {
    'Accept': '*/*',
    "Content-Type": 'application/json',
}

const register = (creds) => {
    return axios.post(API_URL + 'auth/adminRegister', creds)
}

const login = async (creds) => {
    const response = await axios.post(API_URL + 'auth/adminLogin', creds);
    return response.data.results;
}

const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.userData;
}

const AuthServices = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthServices;