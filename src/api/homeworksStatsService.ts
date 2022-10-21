import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { homeworksStatsT } from '../types/homeworkT'
import { baseQueryWithReauth } from './baseApi'
import { createUrlWithParams } from 'utils/createUrlWithParams'

export const homeworksStatsService = createApi({
  reducerPath: 'homeworksStatsService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['homeworskStats'],
  endpoints: build => ({
    fetchHomeworkStats: build.query<homeworksStatsT, any>({
      query: ({ filters, page }) => {
        const url = createUrlWithParams(`/homeworks_stats/?p=${page}&s=4`, filters)
        return {
          url,
        }
      },
      providesTags: ['homeworskStats'],
    }),
    fetchAllHomeworkStats: build.query<homeworksStatsT, { [key: string]: string | number }>({
      query: filters => {
        const url = createUrlWithParams(`/homeworks_stats/?`, filters)
        return {
          url,
        }
      },
      providesTags: ['homeworskStats'],
    }),
  }),
})

export const { useFetchHomeworkStatsQuery, useLazyFetchHomeworkStatsQuery, useFetchAllHomeworkStatsQuery } = homeworksStatsService
