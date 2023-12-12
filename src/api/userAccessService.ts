import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
// import {studentsGroupT, studentsGroupsT} from '../types/studentsGroup'

export const userAccessService = createApi({
  reducerPath: 'userAccessService',
  baseQuery: baseQuery(),
  // tagTypes: ['studentsGroup', 'studentsTable', 'stats_by_month'],
  endpoints: build => ({
    addUserAccess: build.mutation<any, { data: any; schoolName: string }>({
      query: ({ data, schoolName }) => ({
        url: `/${schoolName}/access-distribution/`,
        method: 'POST',
        body: data,
        responseHandler: response => response.text(),
      }),
    }),
    removeUserAccess: build.mutation<any, { data: any; schoolName: string }>({
      query: ({ data, schoolName }) => ({
        url: `/${schoolName}/access-distribution/`,
        method: 'DELETE',
        body: data,
        responseHandler: response => response.text(),
      }),
    }),
    deleteStudentFromGroup: build.mutation<any, { data: any; schoolName: string }>({
      query: ({ data, schoolName }) => ({
        url: `/${schoolName}/access-distribution/`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
})

export const { useAddUserAccessMutation, useRemoveUserAccessMutation, useDeleteStudentFromGroupMutation } = userAccessService
