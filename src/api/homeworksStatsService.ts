import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { homeworksStatsT } from '../types/homeworkT'
import { baseQuery } from './baseApi'
import { createUrlWithParams } from 'utils/createUrlWithParams'

export const homeworksStatsService = createApi({
  reducerPath: 'homeworksStatsService',
  baseQuery: baseQuery(),
  tagTypes: ['homeworskStats'],
  endpoints: build => ({
    fetchHomeworkStats: build.query<homeworksStatsT, { filters: any; page: any; schoolName: string }>({
      query: ({ filters, page, schoolName }) => {
        const pageToFetch = filters.status ? page : 1
        const url = createUrlWithParams(`/${schoolName}/homeworks_stats/?p=${pageToFetch}`, filters)
        return {
          url,
        }
      },
      providesTags: ['homeworskStats'],
    }),
    fetchAllHomeworkStats: build.query<homeworksStatsT, { filters: { [key: string]: string | number }; schoolName: string }>({
      query: ({ filters, schoolName }) => {
        const url = createUrlWithParams(`/${schoolName}/homeworks_stats/`, filters)
        return {
          url,
        }
      },
      providesTags: ['homeworskStats'],
    }),
  }),
})

export const { useFetchHomeworkStatsQuery, useLazyFetchHomeworkStatsQuery, useFetchAllHomeworkStatsQuery } = homeworksStatsService
