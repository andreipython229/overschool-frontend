import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://194.62.19.27:8000/api',
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   const token = (getState() as RootState).auth.token
    //   if (token) {
    //     headers.set('authentication', `Bearer ${token}`)
    //   }
    //   return headers
    // },
  }),
  endpoints: builder => ({
    login: builder.mutation<any, any>({
      query: (credentials: any) => ({
        url: '/users/login/',
        method: 'POST',
        redirect: 'follow',
        body: credentials,
      }),
    }),
  }),
})
export const { useLoginMutation } = userLoginService
