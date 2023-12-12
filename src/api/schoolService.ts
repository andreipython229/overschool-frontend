import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { schoolT } from '../types/schoolHeaderT'
import { UpdateCourses } from './apiTypes'
import { baseQuery } from './baseApi'

export const schoolService = createApi({
  reducerPath: 'schoolService',
  baseQuery: baseQuery(),
  tagTypes: ['school'],
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
    createSchool: build.mutation<schoolT, FormData>({
      query: formdata => ({
        url: `/schools/`,
        method: 'POST',
        body: formdata,
        responseHandler: response => response.text(),
      }),
      invalidatesTags: ['school'],
    }),
  }),
})

export const { useFetchSchoolQuery, useSetSchoolMutation, useCreateSchoolMutation } = schoolService
