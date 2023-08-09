import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthDateT, UserT } from 'types/userT'

const initialState: UserT & AuthDateT = {
  auth: false,
  role: 6,
  authDate: '',
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

export const { auth, role, id, userName } = sliceUser.actions
export const authReduce = sliceUser.reducer
