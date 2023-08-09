import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { studentsTableInfoT } from '../types/courseStatT'
import {baseQuery, baseQueryFn} from './baseApi'
import { createUrlWithParams } from 'utils/createUrlWithParams'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery: baseQueryFn(),
  tagTypes: ['courseStat', 'studentsPerGroup', 'studentPerSchool'],
  endpoints: build => ({
    fetchCourseStat: build.query<studentsTableInfoT, any>({
      query: ({ id, filters }) => ({
        url: createUrlWithParams(`/courses/${id}/get_students_for_course/`, filters),
      }),
      providesTags: ['courseStat'],
    }),
    fetchStudentsPerGroup: build.query<studentsTableInfoT, any>({
      query: ({ id, filters }) => ({
        url: createUrlWithParams(`/students_group/${id}/get_students_for_group/`, filters),
      }),
      providesTags: ['studentsPerGroup'],
    }),
  }),
})

export const { useLazyFetchCourseStatQuery, useLazyFetchStudentsPerGroupQuery } = courseStatService
