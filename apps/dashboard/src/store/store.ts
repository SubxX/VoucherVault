import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { couponApi } from './api/coupon.query'
import authReducer from './features/auth/auth.slice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    [couponApi.reducerPath]: couponApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(couponApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
