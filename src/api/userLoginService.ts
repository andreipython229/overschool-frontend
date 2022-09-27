import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { formDataConverter } from '../utils/formDataConverter'
import { ICredentials, IResponse } from './apiTypes'

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery,
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
    logout: builder.mutation<null, null>({
      query: () => {
        return {
          url: '/logout/',
          method: 'POST',
        }
      },
    }),
  }),
})
export const { useLogoutMutation, useLoginMutation } = userLoginService
