import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {studentsTableInfoT, studentsTableStatsT} from '../types/courseStatT'
import { baseQuery } from './baseApi'
import { createUrlWithParams } from 'utils/createUrlWithParams'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery: baseQuery(),
  tagTypes: ['courseStat', 'studentsPerGroup', 'studentPerSchool', 'AllStudentsPerGroup' ],
  endpoints: build => ({
    fetchCourseStat: build.query<studentsTableStatsT, { id: string | number; filters: any; schoolName: string , page: string | number}>({
      query: ({ id, filters, schoolName , page}) => ({
        url: createUrlWithParams(`/${schoolName}/courses/${id}/get_students_for_course/?p=${page !== undefined ? page : 1}`, filters),
      }),
      providesTags: ['courseStat'],
    }),
    fetchStudentsPerGroup: build.query<studentsTableStatsT, any>({
      query: ({ id, filters, schoolName, page }) => ({
        url: createUrlWithParams(`/${schoolName}/students_group/${id}/get_students_for_group/?p=${page !== undefined ? page : 1}`, filters),
      }),
      providesTags: ['studentsPerGroup'],
    }),
    fetchAllStudentsPerGroup: build.query<studentsTableInfoT, any>({
      query: ({ id, filters, schoolName }) => ({
        url: createUrlWithParams(`/${schoolName}/students_group/${id}/get_all_students_for_group/`, filters),
      }),
      providesTags: ['AllStudentsPerGroup'],
    }),
  }),
})

export const { useLazyFetchCourseStatQuery, useLazyFetchStudentsPerGroupQuery, useLazyFetchAllStudentsPerGroupQuery } = courseStatService
