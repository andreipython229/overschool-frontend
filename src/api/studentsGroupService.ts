import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {baseQuery, baseQueryFn} from './baseApi'
import { studentsGroupT, studentsGroupsT } from '../types/studentsGroup'

export const studentsGroupService = createApi({
  reducerPath: 'studentsGroupService',
  baseQuery: baseQueryFn(),
  tagTypes: ['studentsGroup', 'studentsTable', 'stats_by_month'],
  endpoints: build => ({
    fetchStudentsGroup: build.query<studentsGroupT, void>({
      query: () => ({
        url: `/students_group/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchStudentsGroupByCourse: build.query<studentsGroupT, number | string>({
      query: id => ({
        url: `/courses/${id}/student_groups/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchStudentGroup: build.query<studentsGroupsT, string>({
      query: id => ({
        url: `/students_group/${id}/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchUserCountByMonthData: build.query<void, void>({
      query: () => ({
        url: `/user_count_by_month_group/`,
      }),
      providesTags: ['stats_by_month'],
    }),
    createStudentsGroup: build.mutation<void, studentsGroupsT>({
      query: studentsGroupInfo => ({
        url: `/students_group/`,
        method: 'POST',
        body: studentsGroupInfo,
      }),
      invalidatesTags: ['studentsGroup'],
    }),
    deleteStudentsGroup: build.mutation<void, number>({
      query: id => ({
        url: `/students_group/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['studentsGroup'],
    }),
  }),
})

export const {
  //useFetchUserCountByMonthDataQuery,
  useFetchStudentsGroupByCourseQuery,
  useFetchStudentGroupQuery,
  useFetchStudentsGroupQuery,
  useCreateStudentsGroupMutation,
  useDeleteStudentsGroupMutation,
} = studentsGroupService
