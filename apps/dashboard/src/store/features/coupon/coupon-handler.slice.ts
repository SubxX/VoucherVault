import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICoupon } from '@dashboard/interfaces/coupon.interface'
import { couponApi } from '@dashboard/store/api/coupon.query'

const initialState: {
  open: boolean
  loading: boolean
  startData?: ICoupon
} = {
  open: false,
  loading: false,
  startData: undefined
}

const couponHandlerSlice = createSlice({
  name: 'couponHandler',
  initialState,
  reducers: {
    openDialog: (state, { payload }: PayloadAction<ICoupon | undefined>) => {
      state.open = true;
      state.startData = payload
    },
    closeDialog: (state) => {
      if (!state.loading) return initialState
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(couponApi.endpoints.addCoupon.matchPending, (state) => {
      state.loading = true
    })
    builder.addMatcher(couponApi.endpoints.addCoupon.matchFulfilled, () => initialState)
    builder.addMatcher(couponApi.endpoints.addCoupon.matchRejected, (state) => {
      state.loading = false
    })

    /* Update Coupon */
    builder.addMatcher(couponApi.endpoints.updateCoupon.matchPending, (state) => {
      state.loading = true
    })
    builder.addMatcher(couponApi.endpoints.updateCoupon.matchFulfilled, () => initialState)
    builder.addMatcher(couponApi.endpoints.updateCoupon.matchRejected, (state) => {
      state.loading = false
    })
  }
})

export const { closeDialog, openDialog, setLoading } = couponHandlerSlice.actions
export default couponHandlerSlice.reducer
