import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { paymentsApi } from '@dashboard/store/api/payment.query';

const initialState = {
  dialog: false,
  formLoading: false,
  onboarding: null,
  onboardingLoading: false,
  error: null
}

const onboardingSlice = createSlice({
  name: 'couponHandler',
  initialState,
  reducers: {
    openOnboardingDialog: (state) => {
      state.dialog = true;
    },
    closeOnboardingDialog: (state) => {
      if (!state.formLoading) state.dialog = false
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.formLoading = payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(paymentsApi.endpoints.getRazorpayOnboarding.matchPending, (state) => {
      state.onboardingLoading = true
      state.error = null
    })

    builder.addMatcher(paymentsApi.endpoints.getRazorpayOnboarding.matchFulfilled, (state, { payload }: PayloadAction<any>) => {
      state.onboardingLoading = false
      state.onboarding = payload
    })

    builder.addMatcher(paymentsApi.endpoints.getRazorpayOnboarding.matchRejected, (state, { payload }: PayloadAction<any>) => {
      state.onboardingLoading = false
      state.error = payload
    })

    builder.addMatcher(paymentsApi.endpoints.razorpayOnboarding.matchFulfilled, (state) => {
      state.dialog = false
    })
  }
})

export const { closeOnboardingDialog, openOnboardingDialog, setLoading } = onboardingSlice.actions
export default onboardingSlice.reducer
