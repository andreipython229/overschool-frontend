import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'
import { formDataConverter } from '../utils/formDataConverter'
import { ICredentials, IResponse } from './apiTypes'

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    login: builder.mutation<IResponse, ICredentials>({
      query: credentials => {
        const formdata = formDataConverter(credentials)
        return {
          url: '/login/',
          method: 'POST',
          redirect: 'follow',
          body: formdata,
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/logout/`,
        }
      },
    }),
  }),
})
export const { useLoginMutation, useLogoutMutation } = userLoginService
