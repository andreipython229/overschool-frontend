import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery,
  tagTypes: ['courseStat'],
  endpoints: build => ({
    fetchCourseStat: build.query<any, number>({
      query: (id) => ({
        url: `/course_stat/${id}`,
      }),
      providesTags: ['courseStat'],
    }),
  }),
})

export const { useFetchCourseStatQuery } = courseStatService
