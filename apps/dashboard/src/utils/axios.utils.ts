import axios from 'axios'
import { getAuthToken } from './auth.utils'


export const axiosInstance = axios.create({ baseURL: 'http://localhost:2000/' })


axiosInstance.interceptors.request.use(
  (request) => {
    if (request.headers) request.headers.Authorization = `Bearer ${getAuthToken()}`
    return request
  },
  (error) => Promise.reject(error),
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)
