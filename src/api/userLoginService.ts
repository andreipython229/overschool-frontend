import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { formDataConverter } from '../utils/formDataConverter'
import { ICredentials, IResponse } from './apiTypes'
import { ILoginUserInfo } from 'types/userT'

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery: baseQuery,
  tagTypes: ['login', 'logout', 'useInfo'],
  endpoints: builder => ({
    login: builder.mutation<IResponse, ICredentials>({
      query: credentials => {
        const formdata = formDataConverter(credentials)
        return {
          url: 'http://dev.api.overschool.by:8000/api/login/',
          method: 'POST',
          redirect: 'follow',
          body: formdata,
          responseHandler: response => response.text(),
        }
      },
      invalidatesTags: ['login'],
    }),
    getUserInfo: builder.query<ILoginUserInfo[], void>({
      query: () => ({
        url: `http://dev.api.overschool.by:8000/api/user/`,
      }),
      providesTags: ['useInfo'],
    }),
    logout: builder.query<void, void>({
      query: () => {
        return {
          url: `http://dev.api.overschool.by:8000/api/logout/`,
        }
      },
      providesTags: ['logout'],
    }),
  }),
})
export const { useLoginMutation, useLazyLogoutQuery, useLazyGetUserInfoQuery } = userLoginService
