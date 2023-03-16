import { axiosInstance } from '@dashboard/utils/axios.utils'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const initUser = createAsyncThunk(
  'auth/init_user',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/user/me')
      return data?.user
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
