import {createApi} from '@reduxjs/toolkit/dist/query/react'

import {baseQueryFn} from './baseApi'
// import {studentsGroupT, studentsGroupsT} from '../types/studentsGroup'

export const userAccessService = createApi({
    reducerPath: 'userAccessService',
    baseQuery: baseQueryFn(),
    // tagTypes: ['studentsGroup', 'studentsTable', 'stats_by_month'],
    endpoints: build => ({
        addUserAccess: build.mutation<any, any>({
            query: (data) => ({
                url: `/access-distribution/`,
                method: 'POST',
                body: data,
                responseHandler: response => response.text()
            })
        }),
        deleteStudentFromGroup: build.mutation<any, any>({
            query: (data) => ({
                url: '/access-distribution/',
                method: 'DELETE',
                body: data,
            })
        })
    }),
})

export const {
    useAddUserAccessMutation,
    useDeleteStudentFromGroupMutation,
} = userAccessService
