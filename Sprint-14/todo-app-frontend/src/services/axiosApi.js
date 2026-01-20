import axios from 'axios';
import { API_URL, TIMEOUT } from '../utils/constants.js';
import { getAccessToken } from '../utils/storage.js';

// Axios client for our TODO API
const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT.DEFAULT,
    headers: { 'Content-Type': 'application/json' }
});

// Request interceptor to add auth token
axiosClient.interceptors.request.use( (config) => {
    const token = getAccessToken();
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// Response interceptor for global error handling
axiosClient.interceptors.response.use( (response) => {
    const {data} = response;
    return data;
}, (error) => {
    if (error.response) {
        return Promise.reject(error.response.data);
    }
})

export default axiosClient;