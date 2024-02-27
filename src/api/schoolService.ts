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
    fetchSchoolDocument: build.query<any, string>({
      query: schoolName => ({
        url: `/${schoolName}/school_document/`,
      }),
    }),
    setSchoolDocuments: build.mutation<any, { data: FormData; schoolName: string }>({
      query: body => ({
        url: `/${body.schoolName}/school_document/`,
        method: 'POST',
        body: body.data,
      }),
    }),
  }),
})

export const { useFetchSchoolQuery, useSetSchoolMutation, useCreateSchoolMutation, useLazyFetchSchoolDocumentQuery, useSetSchoolDocumentsMutation } =
  schoolService
