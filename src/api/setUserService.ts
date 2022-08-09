import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'
import { CreateUserT } from '../types/userT'

export const setUserService = createApi({
  reducerPath: 'setUserService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['User'],
  endpoints: build => ({
    fetchUsers: build.query<CreateUserT[], number>({
      query: (limit: any = 5) => ({
        url: `/user`,
        params: {
          _limit: limit,
        },
      }),
      providesTags: result => ['User'],
    }),
    createUser: build.mutation<CreateUserT, CreateUserT>({
      query: post => ({
        url: `/user`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})
