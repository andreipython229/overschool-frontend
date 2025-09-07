import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserProfileT } from '../../../types/userT'

interface UserProfileState {
  userProfile: UserProfileT | null
}

const initialState: UserProfileState = {
  userProfile: null,
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfileT | null>) => {
      state.userProfile = action.payload
    },
    clearUserProfile: state => {
      state.userProfile = null
    },
  },
})

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions
export const userProfileReducer = userProfileSlice.reducer
