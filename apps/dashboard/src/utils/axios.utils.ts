import axios from 'axios'
import { getAuthToken } from './auth.utils'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'


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

// redux axios base query
export const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  },
  unknown,
  unknown
> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params })
      return result
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
