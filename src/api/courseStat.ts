import { createApi } from '@reduxjs/toolkit/dist/query/react'

//perhpas there gonna be another api call

//import { courseStatsT } from '../types/courseStatT'

import { baseQuery } from './baseApi'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery: baseQuery,
  tagTypes: ['courseStat'],
  endpoints: build => ({
    fetchCourseStat: build.query<any, number>({
      query: id => ({
        url: `/courses/${id}/stats/`,
      }),
      providesTags: ['courseStat'],
    }),
  }),
})

export const { useFetchCourseStatQuery } = courseStatService
