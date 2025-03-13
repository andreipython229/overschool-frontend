import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SchoolState {
  schoolName: string
  contactLink: string
  schoolId: number | null
  headerId: number | null
}

const initialState: SchoolState = {
  schoolName: '',
  contactLink: '',
  schoolId: null,
  headerId: null,
}

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    setSchoolData: (state, action: PayloadAction<SchoolState>) => {
      state.schoolName = action.payload.schoolName
      state.contactLink = action.payload.contactLink
      state.headerId = action.payload.headerId
      state.schoolId = action.payload.schoolId
    },
    setContactLink: (state, action: PayloadAction<string>): void => {
      state.contactLink = action.payload
    },
    setSchoolName: (state, action: PayloadAction<string>): void => {
      state.schoolName = action.payload
    },
    setSchoolId: (state, action: PayloadAction<number>) => {
      state.schoolId = action.payload
    },
    setHeaderId: (state, action: PayloadAction<number>) => {
      state.headerId = action.payload
    },
    clearSchoolData: state => {
      state.schoolName = ''
      state.contactLink = ''
      state.schoolId = null
      state.headerId = null
    },
  },
})

export const { setContactLink, setSchoolName, clearSchoolData, setSchoolId, setHeaderId, setSchoolData } = schoolSlice.actions
export const schoolReducer = schoolSlice.reducer
