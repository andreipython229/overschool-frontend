import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { formDataConverter } from '../utils/formDataConverter'
import { ICredentials, IResponse } from './apiTypes'
import { ILoginUserInfo } from 'types/userT'
import { RootState } from 'store/redux/store'
import { authState, logoutState } from 'store/redux/users/slice'
import { baseQueryWithReauth } from './baseQueryReauth'

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

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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
    authLogin: builder.query<IResponse, void>({
      query: () => '/auth/social-complete/',
    }),
  }),
})

export const { useLoginMutation, useAuthLoginQuery } = authApi

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['login', 'logout', 'useInfo'],
  endpoints: builder => ({
    // login: builder.mutation<IResponse, ICredentials>({
    //   query: credentials => {
    //     const formdata = formDataConverter(credentials)
    //     return {
    //       url: '/login/',
    //       method: 'POST',
    //       redirect: 'follow',
    //       body: formdata,
    //       responseHandler: response => response.text(),
    //     }
    //   },
    //   invalidatesTags: ['login'],
    // }),
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
export const { useLazyLogoutQuery, useLazyGetUserInfoQuery } = userLoginService
