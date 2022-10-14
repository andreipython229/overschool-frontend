import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

import { formDataConverter } from '../utils/formDataConverter'

export const userRegisterService = createApi({
  reducerPath: 'userRegisterService',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    registration: builder.mutation({
      query: credentials => {
        const formdata = formDataConverter(credentials)
        return {
          url: '/register/',
          method: 'POST',
          redirect: 'follow',
          body: formdata,
        }
      },
    }),
  }),
})
export const { useRegistrationMutation } = userRegisterService
