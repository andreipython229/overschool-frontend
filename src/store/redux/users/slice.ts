import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthDateT, UserT } from 'types/userT'

const initialState: UserT & AuthDateT = {
  auth: false,
  role: 6,
  authDate: '',
  access_token: '',
  refresh_token: '',
  userId: 0,
  userName: '',
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
      state.role = action.payload
    },
    userName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    id: (state, action: PayloadAction<number>) => {
      state.userId = action.payload
    },
  },
})

export const { auth, token, role, id, userName } = sliceUser.actions
export const authReduce = sliceUser.reducer
