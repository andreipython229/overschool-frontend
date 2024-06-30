import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthDateT, UserT } from 'types/userT'

const initialState: UserT & AuthDateT = {
  authState: {
    access: '',
    refresh: '',
  },
  auth: false,
  role: 0,
  authDate: '',
  userId: 0,
  userName: '',
}

export const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers: {
    authState: (state, action) => {
      state.authState = action.payload
    },
    auth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload
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
    logoutState: state => {
      return initialState
    },
  },
})

export const { auth, role, id, userName, logoutState, authState } = sliceUser.actions
export const authReduce = sliceUser.reducer
