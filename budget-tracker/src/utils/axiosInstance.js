import axios from 'axios';
import  {BASE_URL} from "./apiPath.js";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//request interceptor
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
    }
);

//response interceptor
axiosInstance.interceptors.response.use((response) => {
    return response;
},
    (error) => {
    if(error.response) {
        if(error.response.status === 401) {
            window.location.href = "/login";
        }else if(error.response.status === 500) {
            console.error("Server Error", error.response.data);
        }
    }else if (error.code == "ECONNABORTED") {
        console.error("Request timed out");
    }
    return Promise.reject(error);
    });
export default axiosInstance;