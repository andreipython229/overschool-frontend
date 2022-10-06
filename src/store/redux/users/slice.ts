import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from 'types/userT'

type AuthDateT = {
  authDate: string | number
  access_token: string
  refresh_token: string
}

const initialState: UserT & AuthDateT = {
  auth: false,
  permission: 1,
  authDate: '',
  access_token: '',
  refresh_token: '',
}

export const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload
    },
    token: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.refresh_token = action.payload.refresh_token
      state.access_token = action.payload.access_token
    },
    role: (state, action: PayloadAction<number>) => {
      state.permission = action.payload
    },
  },
})

export const { auth, token, role } = sliceUser.actions
export const authReduce = sliceUser.reducer
