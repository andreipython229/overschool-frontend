import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from 'types/userT'

type AuthDateT = {
  authDate: string | number
  access_token: string
}
const initialState: UserT & AuthDateT = {
  auth: false,
  avatar: null,
  user: { first_name: 'Без имени', email: 'example@gmail.com', last_name: 'None' },
  phone_number: '+375(**)***-**-**',
  city: 'Minsk',
  permission: 1,
  sex: '-',
  authDate: '',
  aboutMySelf: '',
  access_token: '',
}

export const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload
    },
    token: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload
    },
    role: (state, action: PayloadAction<number>) => {
      state.permission = action.payload
    },
  },
})

export const { auth, token, role } = sliceUser.actions
export const authReduce = sliceUser.reducer
