import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { homeworksStatsT } from '../types/homeworkT'
import { createUrlWithParams } from 'utils/createUrlWithParams'
import { baseQueryWithReauth } from './baseQueryReauth';

export const homeworksStatsService = createApi({
  reducerPath: 'homeworksStatsService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['homeworskStats'],
  endpoints: build => ({
    fetchHomeworkStats: build.query<homeworksStatsT, { filters: any; page: any; schoolName: string; course_data?: any }>({
      query: ({ filters, page, schoolName, course_data }) => {
        const pageToFetch = page ? page : 1
        // Условно добавляем courseId в параметры запроса, если он передан
        const url = createUrlWithParams(
          `/${schoolName}/homeworks_stats/?p=${pageToFetch}${course_data ? `&course_data=${course_data}` : ''}`,
          filters
        )
        return {
          url,
        }
      },
      providesTags: ['homeworskStats'],
    }),
    fetchAllHomeworkStats: build.query<homeworksStatsT | [], { filters: { [key: string]: string | number }; schoolName: string }>({
      query: ({ filters, schoolName }) => {
        const url = createUrlWithParams(`/${schoolName}/homeworks_stats/`, filters)
        return {
          url,
        }
      },
      providesTags: ['homeworskStats'],
    }),
    fetchAllStudentsHomework: build.query<any, any>({
      query: ({ filters, schoolName }) => ({
        url: createUrlWithParams(`/${schoolName}/homeworks_stats/`, filters)
      }),
      providesTags: ['homeworskStats'],
    }),
  }),
})

export const { useFetchHomeworkStatsQuery, useLazyFetchHomeworkStatsQuery, useFetchAllHomeworkStatsQuery, useLazyFetchAllHomeworkStatsQuery, useLazyFetchAllStudentsHomeworkQuery } = homeworksStatsService
