import { axiosBaseQuery } from '@dashboard/utils/axios.utils'
import { createApi } from '@reduxjs/toolkit/query/react'

const TAG = 'PAYMENT' as const

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG],
  endpoints: (builder) => ({
    razorpayOnboarding: builder.mutation({
      query: (data) => ({ url: `payments-account/account`, method: 'post', data }),
      invalidatesTags: [{ type: TAG, id: 'mine' }]
    }),
    getRazorpayOnboarding: builder.query({
      query: () => ({ url: `payments-account/account`, method: 'get' }),
      providesTags: [{ type: TAG, id: 'mine' }],
    })
  }),
})


export const {
  useRazorpayOnboardingMutation,
  useGetRazorpayOnboardingQuery
} = paymentsApi
