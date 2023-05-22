import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { schoolHeaderResT } from '../types/schoolHeaderT'
import { UpdateCourses } from './apiTypes'

export const schoolHeaderService = createApi({
  reducerPath: 'coursesHeaderService',
  baseQuery: baseQuery,
  tagTypes: ['schoolHeader'],
  endpoints: build => ({
    fetchSchoolHeader: build.query<schoolHeaderResT, number>({
      query: (id?: number) => ({
        url: `/school_headers/${id}/`,
      }),
      providesTags: ['schoolHeader'],
    }),
    setSchoolHeader: build.mutation<schoolHeaderResT, UpdateCourses>({
      query: ({ formdata, id }) => ({
        url: `/school_headers/${id}/`,
        method: 'PATCH',
        body: formdata,
      }),
      invalidatesTags: ['schoolHeader'],
    }),
  }),
})

export const { useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation } = schoolHeaderService
