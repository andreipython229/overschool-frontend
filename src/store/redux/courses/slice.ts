import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CoursesT } from '../../../types/CoursesT'

export interface ICourses {
  courses: CoursesT[]
}

const initialState: ICourses = {
  courses: [],
}

export const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getCourses: (state, action: PayloadAction<CoursesT[]>): void => {
      state.courses = action.payload || []
    },
  },
})

export const { getCourses } = slice.actions
export const coursesReduce = slice.reducer
