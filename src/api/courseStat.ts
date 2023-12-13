import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { studentsTableInfoT } from '../types/courseStatT'
import { baseQuery } from './baseApi'
import { createUrlWithParams } from 'utils/createUrlWithParams'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery: baseQuery(),
  tagTypes: ['courseStat', 'studentsPerGroup', 'studentPerSchool'],
  endpoints: build => ({
    fetchCourseStat: build.query<studentsTableInfoT, { id: string | number; filters: any; schoolName: string }>({
      query: ({ id, filters, schoolName }) => ({
        url: createUrlWithParams(`/${schoolName}/courses/${id}/get_students_for_course/`, filters),
      }),
      providesTags: ['courseStat'],
    }),
    fetchStudentsPerGroup: build.query<studentsTableInfoT, any>({
      query: ({ id, filters, schoolName }) => ({
        url: createUrlWithParams(`/${schoolName}/students_group/${id}/get_students_for_group/`, filters),
      }),
      providesTags: ['studentsPerGroup'],
    }),
  }),
})

export const { useLazyFetchCourseStatQuery, useLazyFetchStudentsPerGroupQuery } = courseStatService
