import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { studentGroupInfoT, studentsTableHeader } from 'types/studentsGroup'
import { baseQuery } from './baseApi'

export const studentsTableService = createApi({
  reducerPath: 'studentsTableService',
  baseQuery,
  tagTypes: ['studentsTable'],
  endpoints: build => ({
    fetchStudentsTablesHeader: build.query<studentsTableHeader[], void>({
      query: () => ({
        url: `students_table_info/`,
      }),
      providesTags: ['studentsTable'],
    }),
    fetchStudentsTableHeader: build.query<studentsTableHeader, number>({
      query: id => ({
        url: `students_table_info/${id}/`,
      }),
      providesTags: ['studentsTable'],
    }),
    patchStudentsTableHeader: build.mutation<void, { id: number; students_table_info: studentGroupInfoT[] }>({
      query: ({ id, students_table_info }) => ({
        url: `students_table_info/${id}/`,
        method: 'PATCH',
        body: { students_table_info },
      }),
      invalidatesTags: ['studentsTable'],
    }),
  }),
})

export const { useFetchStudentsTableHeaderQuery, usePatchStudentsTableHeaderMutation, useFetchStudentsTablesHeaderQuery } = studentsTableService
