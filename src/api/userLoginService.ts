import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'

interface ILogin {
  email?: string
  phone?: string
  password: string
}

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
    login: builder.mutation<ILogin, any>({
      query: (credentials: string) => ({
        url: '/users/login/',
        method: 'POST',
        redirect: 'follow',
        body: credentials,
      }),
    }),
  }),
})
export const { useLoginMutation } = userLoginService
