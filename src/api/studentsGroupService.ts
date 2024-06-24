import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import {studentsGroupT, studentsGroupsT, groupCourseAccessT} from '../types/studentsGroup'
import { baseQueryWithReauth } from './reauthBaseQuery';

export const studentsGroupService = createApi({
  reducerPath: 'studentsGroupService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['studentsGroup', 'studentsTable', 'stats_by_month'],
  endpoints: build => ({
    fetchStudentsGroup: build.query<studentsGroupT, string>({
      query: schoolName => ({
        url: `/${schoolName}/students_group/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchStudentsGroupByCourse: build.query<studentsGroupT, { id: number | string; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/courses/${id}/student_groups/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchStudentGroup: build.query<studentsGroupsT, { id: string; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/students_group/${id}/`,
      }),
      providesTags: ['studentsGroup'],
    }),
    fetchUserCountByMonthData: build.query<void, string>({
      query: schoolName => ({
        url: `/${schoolName}/user_count_by_month_group/`,
      }),
      providesTags: ['stats_by_month'],
    }),
    createStudentsGroup: build.mutation<void, { studentsGroupInfo: studentsGroupsT; schoolName: string }>({
      query: ({ studentsGroupInfo, schoolName }) => ({
        url: `/${schoolName}/students_group/`,
        method: 'POST',
        body: studentsGroupInfo,
      }),
      invalidatesTags: ['studentsGroup'],
    }),
    createGroupWithoutTeacher: build.mutation<void, { studentsGroupInfo: studentsGroupsT; schoolName: string }>({
      query: ({ studentsGroupInfo, schoolName }) => ({
        url: `/${schoolName}/students_group_no_teacher/`,
        method: 'POST',
        body: studentsGroupInfo,
      }),
      invalidatesTags: ['studentsGroup'],
    }),
    deleteStudentsGroup: build.mutation<void, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/students_group/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['studentsGroup'],
    }),
    patchStudentsGroup: build.mutation<any, { id: number; data: any; schoolName: string }>({
      query: ({ id, data, schoolName }) => ({
        url: `/${schoolName}/students_group/${id}/`,
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['studentsGroup'],
    }),
    patchGroupWithoutTeacher: build.mutation<any, { id: number; data: any; schoolName: string}>({
            query: ({id, data, schoolName}) => ({
                url: `/${schoolName}/students_group_no_teacher/${id}/`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['studentsGroup']
        }),
    deleteStudentFromGroup: build.mutation<any, { data: any; schoolName: string}>({
      query: ({data, schoolName}) => ({
        url: `/${schoolName}/access-distribution/`,
        method: 'DELETE',
        body: data,
      }),
    }),
    addGroupCourseAccess: build.mutation<any, { data: any; schoolName: string }>({
      query: ({data, schoolName}) => ({
        url: `/${schoolName}/group_course_access/`,
        method: 'POST',
        body: data,
      }),
    }),
    fetchGroupCourseAccess: build.query<groupCourseAccessT[], { id: string; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/group_course_access/?group_id=${id}`,
      }),
    }),
    deleteAllGroupCourseAccess: build.mutation<any, { id: string; schoolName: string}>({
      query: ({id, schoolName}) => ({
        url: `/${schoolName}/group_course_access/custom_destroy/?group_id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
    //useFetchUserCountByMonthDataQuery,
    usePatchStudentsGroupMutation,
    usePatchGroupWithoutTeacherMutation,
    useFetchStudentsGroupByCourseQuery,
    useLazyFetchStudentsGroupByCourseQuery,
    useFetchStudentGroupQuery,
    useLazyFetchStudentGroupQuery,
    useFetchStudentsGroupQuery,
    useLazyFetchStudentsGroupQuery,
    useCreateStudentsGroupMutation,
    useCreateGroupWithoutTeacherMutation,
    useDeleteStudentsGroupMutation,
    useDeleteStudentFromGroupMutation,
    useAddGroupCourseAccessMutation,
    useLazyFetchGroupCourseAccessQuery,
    useDeleteAllGroupCourseAccessMutation
} = studentsGroupService
