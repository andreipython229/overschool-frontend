import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './baseQueryReauth'

interface ITopUser {
  student_name: string
  student_avatar: string
  progress_percent: number
}

export interface ICoursesProgress {
  all_baselessons: number
  completed_count: number
  completed_percent: number
  course_id: number
  course_name: string
  rank_in_course: number
  average_mark: number
  top_leaders: ITopUser[]
  homeworks: {
    completed_percent: number
    all_lessons: number
    completed_lessons: number
  }
  lessons: {
    completed_perсent: number
    all_lessons: number
    completed_lessons: number
  }
  tests: {
    completed_percent: number
    all_lessons: number
    completed_lessons: number
  }
}

export interface IUserProgress {
  courses: ICoursesProgress[]
  school_id: number
  school_name: string
  student: string
}

export const userProgressService = createApi({
  reducerPath: 'userProgressService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userProgress', 'progress'],
  endpoints: build => ({
    fetchProgress: build.query<IUserProgress, { course_id: string | number; schoolName: string }>({
      query: ({ course_id, schoolName }) => ({
        url: `/${schoolName}/student_progress/homework_progress/?course_id=${course_id}`,
      }),
    }),
    fetchAllProgress: build.query<IUserProgress, { schoolName: string }>({
      query: ({ schoolName }) => ({
        url: `/${schoolName}/student_progress/homework_progress/`,
      }),
    }),
    fetchStudentProgress: build.query<any, { user_id: string | number; schoolName: string }>({
      query: ({ user_id, schoolName }) => `/${schoolName}/student_progress/get_student_progress_for_admin_or_teacher/?student_id=${user_id}`,
    }),
    fetchSertificate: build.mutation<any, { user_id: number; course_id: number; school_id: number }>({
      query: data => ({
        url: `/certificate/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useFetchProgressQuery,
  useLazyFetchProgressQuery,
  useLazyFetchAllProgressQuery,
  useFetchStudentProgressQuery,
  useFetchSertificateMutation,
} = userProgressService
