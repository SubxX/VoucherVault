import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import authReducer from './features/auth/auth.slice'

import { couponApi } from './api/coupon.query'
import { categoryApi } from './api/categories.query'
import { brandApi } from './api/brand.query'


const store = configureStore({
  reducer: {
    auth: authReducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    couponApi.middleware,
    categoryApi.middleware,
    brandApi.middleware
  ])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
