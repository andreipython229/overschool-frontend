import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CoursesT = {
  course_id: string
  created_at: Date
  updated_at: Date
  published: boolean
  order: number
  name: string
  format: string
  duration_days: number
  price: string
  description: string
  photo?: any
  photo_url?: any
  author_id: number
}

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
