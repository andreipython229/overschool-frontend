import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { IForgotPassword } from './apiTypes'
import { formDataConverter } from '../utils/formDataConverter'
import { baseQueryWithReauth } from './reauthBaseQuery'

export const forgotPassword = createApi({
  reducerPath: 'forgotPassword',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    forgotPassword: build.mutation<IForgotPassword, FormData>({
      query: data => ({
        url: '/forgot_password/',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmailCode: build.mutation<any, FormData>({
      query: data => ({
        url: '/token-validate/',
        method: 'POST',
        body: data,
      }),
    }),
    validateToken: build.query<{ email: string }, { token: string; user_id: number }>({
      query: arg => ({
        url: `/token-validate/${arg.user_id}/${arg.token}/`,
      }),
    }),
    resetPassword: build.mutation<any, FormData>({
      query: data => ({
        url: '/password-reset/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})
export const { useForgotPasswordMutation, useVerifyEmailCodeMutation, useResetPasswordMutation, useLazyValidateTokenQuery } = forgotPassword
