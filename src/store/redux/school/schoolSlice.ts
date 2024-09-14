import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SchoolState {
  schoolName: string
  contactLink: string
}

const initialState: SchoolState = {
  schoolName: '',
  contactLink: '',
}

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    setContactLink: (state, action: PayloadAction<string>): void => {
      state.contactLink = action.payload
    },
    setSchoolName: (state, action: PayloadAction<string>): void => {
      state.schoolName = action.payload
    },
    removeSchoolName: state => {
      state.schoolName = ''
      state.contactLink = ''
    },
  },
})

export const { setContactLink, setSchoolName, removeSchoolName } = schoolSlice.actions
export const schoolReducer = schoolSlice.reducer
