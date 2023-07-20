import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

import { schoolHeaderResT } from '../types/schoolHeaderT'
import { UpdateCourses } from './apiTypes'
import {baseQuery} from "./baseApi";

export const schoolHeaderService = createApi({
  reducerPath: 'coursesHeaderService',
  baseQuery: baseQuery("/api/"),
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
