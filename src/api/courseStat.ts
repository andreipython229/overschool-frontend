import { createApi } from '@reduxjs/toolkit/dist/query/react'

// import { courseStatsT } from '../types/courseStatT'
import { baseQueryWithReauth } from './baseApi'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['courseStat'],
  endpoints: build => ({
    fetchCourseStat: build.query<any, number>({
      query: id => ({
        url: `/courses/${id}/stats`,
      }),
      providesTags: ['courseStat'],
    }),
  }),
})

export const { useFetchCourseStatQuery } = courseStatService
