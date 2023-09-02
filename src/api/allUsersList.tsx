import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {baseQueryFn, baseQuery} from './baseApi'
import { IAllUsers } from './apiTypes';


export const getAllUsers = createApi({
  reducerPath: 'AllUsers',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: () => ({url:'/all_users/',
      providedTags: ['AllUsers', 'FetchAllUsers']
    })
    }),
  }),
})

export const { useFetchAllUsersQuery } = getAllUsers;