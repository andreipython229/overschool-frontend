import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['courseStat'],
  endpoints: build => ({
    fetchCourseStat: build.query({
      query: id => ({
        url: `/courses/${id}/stats`,
      }),
      providesTags: ['courseStat'],
    }),
  }),
})

export const { useFetchCourseStatQuery } = courseStatService
