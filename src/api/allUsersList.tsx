import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQuery} from './baseApi'
import {employeePaginatorT} from "../types/userT";
import { baseQueryWithReauth } from './baseQueryReauth';


export const getAllUsers = createApi({
    reducerPath: 'AllUsers',
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({
        fetchAllUsers: build.query<employeePaginatorT, any>({
            query: ({schoolName, page, role, size}) => ({
                url: `/${schoolName}/all_users/?p=${page !== undefined ? page : 1}&role=${role}&s=${size !== undefined ? size : 20}`,
            })
        }),
    }),
})

export const {useLazyFetchAllUsersQuery, useFetchAllUsersQuery} = getAllUsers;