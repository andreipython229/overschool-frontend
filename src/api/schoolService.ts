import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

// import { baseQuery } from './baseApi'
import { schoolT } from '../types/schoolHeaderT'
import { UpdateCourses } from './apiTypes'
import { studentsTableInfoT } from '../types/courseStatT'
import { createUrlWithParams } from 'utils/createUrlWithParams'
import {baseQuery} from "./baseApi";

export const schoolService = createApi({
  reducerPath: 'schoolService',
  baseQuery: baseQuery(),
  tagTypes: ['school', ],
  endpoints: build => ({
    fetchSchool: build.query<schoolT, number>({
      query: (id?: number) => ({
        url: `/schools/${id}/`,
      }),
      providesTags: ['school'],
    }),
    setSchool: build.mutation<schoolT, UpdateCourses>({
      query: ({ formdata, id }) => ({
        url: `/schools/${id}/`,
        method: 'PATCH',
        body: formdata,
      }),
      invalidatesTags: ['school'],
    }),
  }),
})

export const { useFetchSchoolQuery, useSetSchoolMutation, } = schoolService
