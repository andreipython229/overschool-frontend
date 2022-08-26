// Define a type for the slice state
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ClassesType = {
  name: string
  type: string
}

interface CourseI {
  course_id: number | string
  created_at: Date | string
  updated_at: Date | string
  published: boolean
  order: number
  name: string
  format: string
  duration_days: number
  price: string
  description: string
  photo: string | undefined | null
  photo_url: string | undefined | null
  author_id: number
  classes: ClassesType[]
}

// Define the initial state using that type
const initialState: CourseI = {
  name: '',
  course_id: 0,
  created_at: '',
  updated_at: '',
  published: false,
  order: 0,
  format: '',
  duration_days: 0,
  price: '',
  description: '',
  photo: null,
  photo_url: null,
  author_id: 0,
  classes: [],
}

export const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourseId: (state, action: PayloadAction<string>) => {
      state.course_id = action.payload
    },
    addClasses: (state, action: PayloadAction<ClassesType>) => {
      state.classes.push(action.payload)
    },
  },
})

export const { addCourseId, addClasses } = slice.actions
export const courseReduce = slice.reducer
