import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { studentGroupInfoT, studentsTableHeader } from 'types/studentsGroup'
import { baseQuery } from './baseApi'

export const studentsTableService = createApi({
  reducerPath: 'studentsTableService',
  baseQuery: baseQuery(),
  tagTypes: ['studentsTable'],
  endpoints: build => ({
    fetchStudentsTablesHeader: build.query<studentsTableHeader[], string>({
      query: schoolName => ({
        url: `/${schoolName}/students_table_info/`,
      }),
      providesTags: ['studentsTable'],
    }),
    fetchStudentsTableHeader: build.query<studentsTableHeader, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/students_table_info/${id}/`,
      }),
      providesTags: ['studentsTable'],
    }),
    patchStudentsTableHeader: build.mutation<void, { id: number; students_table_info: studentGroupInfoT[]; schoolName: string }>({
      query: ({ id, students_table_info, schoolName }) => ({
        url: `/${schoolName}/students_table_info/${id}/`,
        method: 'PATCH',
        body: { students_table_info },
      }),
      invalidatesTags: ['studentsTable'],
    }),
  }),
})

export const { useLazyFetchStudentsTableHeaderQuery, useFetchStudentsTableHeaderQuery, usePatchStudentsTableHeaderMutation, useFetchStudentsTablesHeaderQuery } = studentsTableService
