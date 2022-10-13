import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

export const userHomeworkService = createApi({
  reducerPath: 'userHomeworkService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userHomework'],
  endpoints: build => ({
    fetchUserHomework: build.query<any, number>({
      query: id => ({
        url: `/user_homeworks/${id}/`,
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
  }),
})

export const { useFetchUserHomeworkQuery, useFetchTeacherHomeworkQuery, usePostUserHomeworkMutation } = userHomeworkService
