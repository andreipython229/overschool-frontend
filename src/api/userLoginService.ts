import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { formDataConverter } from '../utils/formDataConverter'
import { ICredentials, IResponse } from './apiTypes'
import { ILoginUserInfo } from 'types/userT'
import { RootState } from 'store/redux/store'
import { authState, logoutState } from 'store/redux/users/slice'
import { baseQueryWithReauth } from './baseQueryReauth'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    authSocial: builder.query<IResponse, void>({
      query: () => '/auth/social-complete/',
    }),
  }),
})

export const { useAuthSocialQuery } = authApi

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery: baseQueryWithReauth, // ИСПРАВЛЕНО: используем baseQueryWithReauth
  tagTypes: ['login', 'logout', 'useInfo'],
  endpoints: builder => ({
    login: builder.mutation<IResponse, ICredentials>({
      query: credentials => {
        const formdata = formDataConverter(credentials)
        return {
          url: '/login/',
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
        url: `/user/`,
      }),
      providesTags: ['useInfo'],
    }),
    logout: builder.query<void, void>({
      query: () => {
        return {
          url: `/logout/`,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logoutState())
          dispatch(authState({ access: '', refresh: '' }))
        } catch (err) {
          console.log(err)
        }
      },
      providesTags: ['logout'],
    }),
  }),
})

export const { useLoginMutation, useLazyLogoutQuery, useLazyGetUserInfoQuery } = userLoginService
