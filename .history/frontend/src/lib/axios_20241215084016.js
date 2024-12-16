import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:"http://lovalhost:5001/api",
    withCredentials:true,
})