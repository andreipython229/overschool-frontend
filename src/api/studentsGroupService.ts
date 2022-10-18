import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'
import { studentsGroupT, studentsGroupsT } from '../types/studentsGroup'
import { studentGroupInfoT, studentsTableHeader } from 'types/studentsGroup'

export const studentsGroupService = createApi({
  reducerPath: 'studentsGroupService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['studentsGroup', 'studentsTable', 'stats_by_month'],
  endpoints: build => ({
    fetchStudentsGroup: build.query<studentsGroupT, void>({
      query: () => ({
        url: `/students_group/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchStudentsGroupByCourse: build.query<studentsGroupT, number>({
      query: id => ({
        url: `/courses/${id}/student_groups/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchStudentGroup: build.query<studentsGroupsT, string>({
      query: id => ({
        url: `/students_group/${id}`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchStudentsTableHeader: build.query<studentsTableHeader, number>({
      query: id => ({
        url: `/students_table_info/${id}/`,
      }),
      providesTags: ['studentsTable'],
    }),
    patchStudentsTableHeader: build.mutation<void, { id: number; students_table_info: studentGroupInfoT[] }>({
      query: ({ id, students_table_info }) => ({
        url: `/students_table_info/${id}/`,
        method: 'PATCH',
        body: { students_table_info },
      }),
      invalidatesTags: ['studentsTable'],
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
  useFetchUserCountByMonthDataQuery,
  useFetchStudentsGroupByCourseQuery,
  useFetchStudentGroupQuery,
  useFetchStudentsTableHeaderQuery,
  usePatchStudentsTableHeaderMutation,
  useFetchStudentsGroupQuery,
  useCreateStudentsGroupMutation,
  useDeleteStudentsGroupMutation,
} = studentsGroupService
