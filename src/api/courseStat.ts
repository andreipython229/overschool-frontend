import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { studentsTableInfoT } from '../types/courseStatT'

import { baseQuery } from './baseApi'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery: baseQuery(),
  tagTypes: ['courseStat', 'studentsPerGroup'],
  endpoints: build => ({
    fetchCourseStat: build.query<studentsTableInfoT, string>({
      query: id => ({
        url: `/courses/${id}/get_students_for_course/`,
      }),
      providesTags: ['courseStat'],
    }),
    fetchStudentsPerGroup: build.query<studentsTableInfoT, string>({
      query: id => ({
        url: `/students_group/${id}/get_students_for_group/`,
      }),
      providesTags: ['studentsPerGroup'],
    }),
    fetchStudentsPerSchool: build.query<studentsTableInfoT, void>({
      query: () => ({
        url: `schools/1/stats/`,
      }),
      providesTags: ['studentsPerGroup'],
    }),
  }),
})

export const { useFetchCourseStatQuery, useFetchStudentsPerGroupQuery, useFetchStudentsPerSchoolQuery } = courseStatService
