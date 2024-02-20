import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQuery} from './baseApi'
import {employeePaginatorT} from "../types/userT";


export const getAllUsers = createApi({
    reducerPath: 'AllUsers',
    baseQuery: baseQuery(),
    endpoints: build => ({
        fetchAllUsers: build.query<employeePaginatorT, any>({
            query: ({schoolName, page, role}) => ({
                url: `/${schoolName}/all_users/?p=${page !== undefined ? page : 1}&role=${role}`,
            })
        }),
    }),
})

export const {useLazyFetchAllUsersQuery, useFetchAllUsersQuery} = getAllUsers;