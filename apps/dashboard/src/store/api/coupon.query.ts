import { axiosBaseQuery } from '@dashboard/utils/axios.utils'
import { createApi } from '@reduxjs/toolkit/query/react'

type Coupon = {
  id: string
  name: string
}
const TAG = 'COUPON' as const

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG],
  endpoints: (builder) => ({
    getCoupons: builder.query<Coupon[], void>({
      query: () => ({ url: `coupons`, method: 'get' }),
      providesTags: result => [...(result ?? []).map(({ id }) => ({ type: TAG, id })), { type: TAG, id: 'all' }]
    }),
    getCoupon: builder.query<Coupon, string>({
      query: (id) => ({ url: `posts/${id}`, method: 'get' }),
      providesTags: (result, error, id) => [{ type: TAG, id }],
    }),
    addCoupon: builder.mutation<Coupon, Coupon>({
      query: (body) => ({ url: `coupons`, method: 'post', body }),
      invalidatesTags: [{ type: TAG, id: 'all' }]
    }),
    updateCoupon: builder.mutation<Coupon, Partial<Coupon> & Pick<Coupon, 'id'>>({
      query: ({ id, ...body }) => ({ url: `coupons`, method: 'patch', body }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          couponApi.util.updateQueryData('getCoupon', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        await queryFulfilled.catch(patchResult.undo)
      },
      invalidatesTags: (result, error, { id }) => [{ type: TAG, id }],
    }),
    deleteCoupon: builder.mutation<boolean, string>({
      query: (id) => ({ url: `coupons/${id}`, method: 'delete' }),
      invalidatesTags: (result, error, id) => [{ type: TAG, id }],
    }),
  }),
})


export const {
  useGetCouponsQuery,
  useGetCouponQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation
} = couponApi
