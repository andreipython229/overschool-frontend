// Define a type for the slice state
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from '../store'
import { UserT } from 'types/userT'

type AuthDateT = {
  authDate: string | number
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
}

export const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload
    },
    loginUser: (state, action: PayloadAction<{ value: string | number }>) => {
      state.authDate = action.payload.value
    },
    changeInfo: (state, action: PayloadAction<UserT>) => {
      state.city = action.payload.city
      state.avatar = action.payload.avatar
      state.user.first_name = action.payload.user.first_name
      state.user.last_name = action.payload.user.last_name
      state.user.email = action.payload.user.email
      state.sex = action.payload.sex
      state.aboutMySelf = action.payload.aboutMySelf
    },
  },
})

export const { auth, loginUser, changeInfo } = sliceUser.actions
export const authReduce = sliceUser.reducer
