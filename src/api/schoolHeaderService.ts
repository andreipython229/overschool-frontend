import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

// import { baseQuery } from './baseApi'
import { schoolHeaderResT } from '../types/schoolHeaderT'
import { UpdateCourses } from './apiTypes'
import {studentsTableInfoT, studentsTableStatsT} from '../types/courseStatT'
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
    fetchStudentsPerSchool: build.query<studentsTableStatsT, any>({
      query: ({id, page, filters}) => ({
        url: createUrlWithParams(`schools/${id}/stats/?p=${page !== undefined ? page : 1}`, filters),
      }),
      providesTags: ['studentPerSchool'],
    }),
    fetchStudentsDataPerSchool: build.query<studentsTableInfoT, any>({
      query: ({id, filters}) => ({
        url: createUrlWithParams(`schools/${id}/stats/`, filters),
      }),
      providesTags: ['studentPerSchool'],
    }),
  }),
})

export const { useFetchStudentsDataPerSchoolQuery, useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation, useLazyFetchStudentsPerSchoolQuery } = schoolHeaderService
