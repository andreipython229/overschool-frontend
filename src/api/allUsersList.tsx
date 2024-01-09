import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQuery} from './baseApi'


export const getAllUsers = createApi({
    reducerPath: 'AllUsers',
    baseQuery: baseQuery(),
    endpoints: build => ({
        fetchAllUsers: build.query<any, string>({
            query: (schoolName) => ({
                url: `/${schoolName}/all_users/`,
            })
        }),
    }),
})

export const {useLazyFetchAllUsersQuery, useFetchAllUsersQuery} = getAllUsers;