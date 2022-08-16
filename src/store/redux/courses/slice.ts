import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CoursesT = {
  course_id: string
  created_at: string
  updated_at: string
  published: boolean | any
  order: number | any
  name: string
  format: string
  duration_days: number | string | any
  price: string
  description: string
  photo: string | undefined
  photo_url: string | undefined
  author_id: number | any
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
