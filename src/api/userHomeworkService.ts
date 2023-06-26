import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { UserHomework, Homework } from 'types/homeworkT'

import { baseQuery } from './baseApi'

export const userHomeworkService = createApi({
  reducerPath: 'userHomeworkService',
  baseQuery: baseQuery,
  tagTypes: ['userHomework'],
  endpoints: build => ({
    fetchUserHomework: build.query<UserHomework, number>({
      query: id => ({
        url: `/user_homeworks/${id}/`,
      }),
      providesTags: ['userHomework'],
    }),
    fetchHomeworkData: build.query<Homework, number>({
      query: id => ({
        url: `/homeworks/${id}/`,
      }),
      providesTags: ['userHomework'],
    }),
    fetchTeacherHomework: build.query<any, number>({
      query: id => ({
        url: `/teacher_homeworks/${id}/`,
      }),
      providesTags: ['userHomework'],
    }),
    postUserHomework: build.mutation<void, any>({
      query: homework => {
        return {
          url: `/user_homeworks/`,
          method: 'POST',
          body: homework,
        }
      },
      invalidatesTags: ['userHomework'],
    }),
    patchUserHomework: build.mutation<void, any>({
      query: homework => {
        return {
          url: `/user_homeworks/`,
          method: 'PATCH',
          body: homework,
        }
      },
      invalidatesTags: ['userHomework'],
    }),
    createCheckReply: build.mutation<void, any>({
      query: data => {
        return {
          url: `/user_homework_checks/`,
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
  useFetchTeacherHomeworkQuery,
  usePostUserHomeworkMutation,
  useFetchHomeworkDataQuery,
  useCreateCheckReplyMutation,
} = userHomeworkService
