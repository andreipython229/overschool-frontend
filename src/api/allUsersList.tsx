import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryFn} from './baseApi'


export const getAllUsers = createApi({
    reducerPath: 'AllUsers',
    baseQuery: baseQueryFn(),
    endpoints: build => ({
        fetchAllUsers: build.query<any, void>({
            query: () => ({
                url: '/all_users/',
            })
        }),
    }),
})

export const {useFetchAllUsersQuery} = getAllUsers;