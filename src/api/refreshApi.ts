import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from 'store/redux/store'

export const refreshApi = createApi({
  reducerPath: 'refreshApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const { refresh: refreshToken } = (getState() as RootState).user.authState
      if (refreshToken) {
        headers.set('Authorization', `Bearer ${refreshToken}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    refreshToken: builder.mutation<{ access: string; refresh: string }, string>({
      query: token => ({
        url: '/token/refresh/',
        method: 'POST',
        body: { refresh: token },
      }),
    }),
  }),
}) 