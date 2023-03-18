import { axiosBaseQuery } from '@dashboard/utils/axios.utils'
import { createApi } from '@reduxjs/toolkit/query/react'
import { ICoupon } from '@dashboard/interfaces/coupon.interface'

const TAG = 'COUPON' as const

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG],
  endpoints: (builder) => ({
    getCoupons: builder.query<ICoupon[], string>({
      query: (query) => ({ url: `coupon${query}`, method: 'get' }),
      providesTags: result => [...(result ?? []).map(({ _id }) => ({ type: TAG, id: _id })), { type: TAG, id: 'all' }]
    }),
    getMyCoupons: builder.query<ICoupon[], void>({
      query: () => ({ url: `coupon/my-coupons`, method: 'get' }),
      providesTags: result => [...(result ?? []).map(({ _id }) => ({ type: TAG, id: _id })), { type: TAG, id: 'mine' }]
    }),
    getCoupon: builder.query<ICoupon, string>({
      query: (id) => ({ url: `posts/${id}`, method: 'get' }),
      providesTags: (result, error, id) => [{ type: TAG, id }],
    }),
    addCoupon: builder.mutation<ICoupon, Partial<ICoupon>>({
      query: (data) => ({ url: `coupon`, method: 'post', data }),
      invalidatesTags: [{ type: TAG, id: 'all' }, { type: TAG, id: 'mine' }]
    }),
    updateCoupon: builder.mutation<ICoupon, Partial<ICoupon>>({
      query: ({ _id, ...data }) => ({ url: `coupon/${_id}`, method: 'patch', data }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          couponApi.util.updateQueryData('getCoupon', _id as string, (draft) => {
            Object.assign(draft, patch)
          })
        )
        await queryFulfilled.catch(patchResult.undo)
      },
      invalidatesTags: (result, error, { _id }) => [{ type: TAG, id: _id }],
    }),
    deleteCoupon: builder.mutation<boolean, string>({
      query: (id) => ({ url: `coupon/${id}`, method: 'delete' }),
      invalidatesTags: (result, error, id) => [{ type: TAG, id }],
    }),
  }),
})


export const {
  useGetCouponsQuery,
  useGetCouponQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useGetMyCouponsQuery
} = couponApi
