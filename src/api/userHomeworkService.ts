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
  }),
})

export const { useFetchUserHomeworkQuery } = userHomeworkService
