import { getAuthToken } from '@dashboard/utils/auth.utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initUser } from './auth.actions';

const initialState = {
  dialog: false,
  loading: false,
  jwtToken: getAuthToken(),
  user: null, // for user object
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.jwtToken = payload
      state.dialog = false
    },
    setDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.dialog = payload
    },
    signOut: () => initialState
  },
  extraReducers: {
    [initUser.pending.toString()]: (state) => {
      state.loading = true
      state.error = null
    },
    [initUser.fulfilled.toString()]: (state, { payload }: PayloadAction<any>) => {
      state.user = payload
      state.loading = false
    },
    [initUser.rejected.toString()]: (state, { payload }: PayloadAction<any>) => {
      state.error = payload
      state.loading = false
      state.user = null
    }
  }
})

export const { setToken, setDialog, signOut } = authSlice.actions
export default authSlice.reducer
