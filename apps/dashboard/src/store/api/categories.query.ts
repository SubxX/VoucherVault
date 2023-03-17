import { axiosBaseQuery } from '@dashboard/utils/axios.utils'
import { createApi } from '@reduxjs/toolkit/query/react'

type Category = {
  value: string
  label: string
}
type CategoryApiResponse = {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}
const TAG = 'CATEGORY' as const

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: `category`, method: 'get' }),
      providesTags: result => [...(result ?? []).map(({ value }) => ({ type: TAG, id: value })), { type: TAG, id: 'all' }],
      transformResponse: (response: CategoryApiResponse[]) => {
        return (response ?? [])?.map((c) => ({ value: c._id, label: c.name }))
      }
    }),
    addCategory: builder.mutation<Category, Category>({
      query: (body) => ({ url: `category`, method: 'post', body }),
      invalidatesTags: [{ type: TAG, id: 'all' }]
    })
  }),
})


export const {
  useGetCategoriesQuery,
  useAddCategoryMutation
} = categoryApi
