import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'
import { studentsGroupT } from '../types/studentsGroup'

export const studentsGroupService = createApi({
  reducerPath: 'studentsGroupService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['studentsGroup'],
  endpoints: build => ({
    fetchStudentsGroup: build.query<studentsGroupT[], void>({
      query: () => ({
        url: `/students_group/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchStudentsTableHeader: build.query<any, number>({
      query: id => ({
        url: `/students_table_info/${id}/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    patchStudentsTableHeader: build.mutation<any, any>({
      query: ({ id, students_table_info }) => ({
        url: `/students_table_info/${id}/`,
        method: 'PATCH',
        body: students_table_info,
      }),
      invalidatesTags: ['studentsGroup'],
    }),
    fetchUserCountByMonthData: build.query<void, void>({
      query: () => ({
        url: `/user_count_by_month_group/`,
      }),
    }),
    createStudentsGroup: build.mutation<void, studentsGroupT>({
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
  useFetchStudentsTableHeaderQuery,
  usePatchStudentsTableHeaderMutation,
  useFetchStudentsGroupQuery,
  useCreateStudentsGroupMutation,
  useDeleteStudentsGroupMutation,
} = studentsGroupService
