import { axiosBaseQuery } from '@dashboard/utils/axios.utils'
import { createApi } from '@reduxjs/toolkit/query/react'

type Brand = {
  value: string
  label: string
}
type BrandApiResponse = {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

const TAG = 'BRAND' as const

export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG],
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => ({ url: `brand`, method: 'get' }),
      providesTags: result => [...(result ?? []).map(({ value }) => ({ type: TAG, id: value })), { type: TAG, id: 'all' }],
      transformResponse: (response: BrandApiResponse[]) => {
        return (response ?? [])?.map((c) => ({ value: c._id, label: c.name }))
      }
    }),
    addBrand: builder.mutation<Omit<Brand, '_id'>, Brand>({
      query: (body) => ({ url: `brand`, method: 'post', body }),
      invalidatesTags: [{ type: TAG, id: 'all' }]
    })
  }),
})


export const {
  useGetBrandsQuery,
  useAddBrandMutation
} = brandApi
