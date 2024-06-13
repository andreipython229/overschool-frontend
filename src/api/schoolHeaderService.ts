import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

// import { baseQuery } from './baseApi'
import { schoolHeaderResT } from '../types/schoolHeaderT'
import { UpdateCourses } from './apiTypes'
import {studentsTableInfoT, studentsTableStatsT} from '../types/courseStatT'
import { createUrlWithParams } from 'utils/createUrlWithParams'
import { createUrlWithFiltersAndFields } from 'utils/createUrlWithFiltersAndFields'
import {baseQuery} from "./baseApi";

export const schoolHeaderService = createApi({
  reducerPath: 'coursesHeaderService',
  baseQuery: baseQuery(),
  tagTypes: ['schoolHeader', 'studentPerSchool', 'allStudentPerSchool'],
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
      query: ({id, page, filters, fields}) => ({
        url: createUrlWithFiltersAndFields(`schools/${id}/stats/?p=${page !== undefined ? page : 1}`, filters, fields),
      }),
      providesTags: ['studentPerSchool'],
    }),
    fetchAllStudentsPerSchool: build.query<studentsTableInfoT, any>({
      query: ({id, filters}) => ({
        url: createUrlWithParams(`schools/${id}/all_stats`, filters),
      }),
      providesTags: ['allStudentPerSchool'],
    }),
    fetchStudentsDataPerSchool: build.query<studentsTableStatsT, any>({
      query: ({id, filters}) => ({
        url: createUrlWithParams(`schools/${id}/stats/`, filters),
      }),
      providesTags: ['studentPerSchool'],
    }),
  }),
})

export const { useFetchStudentsDataPerSchoolQuery, useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation, useLazyFetchStudentsPerSchoolQuery, useLazyFetchAllStudentsPerSchoolQuery } = schoolHeaderService
