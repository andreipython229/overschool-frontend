import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'

export const userProgressService = createApi({
  reducerPath: 'userProgressService',
  baseQuery: baseQuery(),
  tagTypes: ['userProgress', 'progress'],
  endpoints: build => ({
    fetchProgress: build.query<any, { course_id: string | number; schoolName: string }>({
      query: ({ course_id, schoolName }) => ({
        url: `/${schoolName}/student_progress/homework_progress/?course_id=${course_id}`,
      }),
    }),
    fetchStudentProgress: build.query<any, { user_id: string | number; schoolName: string }>({
      query: ({ user_id, schoolName }) => `/${schoolName}/student_progress/get_student_progress_for_admin_or_teacher/?student_id=${user_id}`,
    }),
    fetchSertificate: build.query<any, number | string>({
      query: courseId => ({
        url: `/user/generate_certificate/?course_id=${courseId}`,
      }),
    }),
  }),
})

export const {
  useFetchProgressQuery,
  useLazyFetchProgressQuery,
  useFetchStudentProgressQuery,
  useLazyFetchSertificateQuery,
  useFetchSertificateQuery,
} = userProgressService
