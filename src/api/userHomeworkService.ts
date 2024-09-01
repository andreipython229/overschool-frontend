import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { UserHomework, Homework } from 'types/homeworkT'
import { baseQuery } from './baseApi'
import { IHomework } from 'types/sectionT'
import { baseQueryWithReauth } from './baseQueryReauth'

interface CheckReply {
  user_homework_check_id: number
  user_homework_id: number
  mark: number
  text: string
  status: string
  author: number
  created_at: string
  updated_at: string
}

export const userHomeworkService = createApi({
  reducerPath: 'userHomeworkService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userHomework'],
  endpoints: build => ({
    fetchUserHomework: build.query<UserHomework, { id: number; schoolName: string; courseId?: string }>({
      query: ({ id, schoolName, courseId }) => ({
        url: courseId ? `/${schoolName}/user_homeworks/${id}/${courseId}/` : `/${schoolName}/user_homeworks/${id}/`,
      }),
      providesTags: ['userHomework'],
    }),
    fetchHomeworkData: build.query<IHomework, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/homeworks/${id}/`,
      }),
      providesTags: ['userHomework'],
    }),
    fetchTeacherHomework: build.query<any, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/teacher_homeworks/${id}/`,
      }),
      providesTags: ['userHomework'],
    }),
    postUserHomework: build.mutation<CheckReply, { homework: number, text: string, schoolName: string, course_id?: number}>({
      query: ({  homework, text, schoolName, course_id }) => {
        return {
          url: `/${schoolName}/user_homeworks/`,
          method: 'POST',
          body: {homework, text, course_id},
        }
      },
      invalidatesTags: ['userHomework'],
    }),
    patchUserHomework: build.mutation<void, {homework: any, schoolName: string}>({
      query: ({ homework, schoolName }) => {
        return {
          url: `/${schoolName}/user_homeworks/`,
          method: 'PATCH',
          body: homework,
        }
      },
      invalidatesTags: ['userHomework'],
    }),
    createCheckReply: build.mutation<CheckReply, {data: any, schoolName: string}>({
      query: ({ data, schoolName }) => {
        return {
          url: `/${schoolName}/user_homework_checks/`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['userHomework'],
    }),
  }),
})

export const {
  useFetchUserHomeworkQuery,
  useLazyFetchUserHomeworkQuery,
  useFetchTeacherHomeworkQuery,
  usePostUserHomeworkMutation,
  useFetchHomeworkDataQuery,
  useLazyFetchHomeworkDataQuery,
  useCreateCheckReplyMutation,
} = userHomeworkService
