import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { homeworksStatsT } from '../types/homeworkT'
import { baseQueryWithReauth } from './baseApi'

export const homeworksStatsService = createApi({
  reducerPath: 'homeworksStatsService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['homeworskStats'],
  endpoints: build => ({
    fetchHomeworkStats: build.query<homeworksStatsT, number>({
      query: page => ({
        url: `/homeworks_stats/?p=${page}&s=4`,
      }),
      providesTags: ['homeworskStats'],
    }),
    fetchAllHomeworkStats: build.query<homeworksStatsT, void>({
      query: () => ({
        url: `/homeworks_stats/`,
      }),
      providesTags: ['homeworskStats'],
    }),
  }),
})

export const { useFetchHomeworkStatsQuery, useLazyFetchHomeworkStatsQuery, useFetchAllHomeworkStatsQuery } = homeworksStatsService
