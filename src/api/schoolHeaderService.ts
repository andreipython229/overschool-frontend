import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

// import { baseQuery } from './baseApi'
import { schoolHeaderResT } from '../types/schoolHeaderT'
import { UpdateCourses } from './apiTypes'
import { studentsTableInfoT } from '../types/courseStatT'
import { createUrlWithParams } from 'utils/createUrlWithParams'
import {baseQuery} from "./baseApi";

export const schoolHeaderService = createApi({
  reducerPath: 'coursesHeaderService',
  baseQuery: baseQuery(),
  tagTypes: ['schoolHeader', 'studentPerSchool'],
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
    fetchStudentsPerSchool: build.query<studentsTableInfoT, { [key: string]: string | number }>({
      query: filters => ({
        url: createUrlWithParams(`schools/1/stats/`, filters),
      }),
      providesTags: ['studentPerSchool'],
    }),
  }),
})

export const { useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation, useLazyFetchStudentsPerSchoolQuery } = schoolHeaderService
