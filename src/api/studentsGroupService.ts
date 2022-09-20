import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { studentsGroupT } from '../types/studentsGroup'

export const studentsGroupService = createApi({
  reducerPath: 'studentsGroupService',
  baseQuery,
  tagTypes: ['studentsGroup'],
  endpoints: build => ({
    fetchStudentsGroup: build.query<studentsGroupT[], void>({
      query: () => ({
        url: `/students_group/`,
      }),
      providesTags: ['studentsGroup'],
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
        url: `/students_group/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['studentsGroup'],
    }),
  }),
})

export const { useFetchStudentsGroupQuery, useCreateStudentsGroupMutation, useDeleteStudentsGroupMutation } = studentsGroupService
