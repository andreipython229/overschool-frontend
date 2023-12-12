import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { formDataConverter } from '../utils/formDataConverter'
import { baseQuery } from './baseApi'

export const userRegisterService = createApi({
  reducerPath: 'userRegisterService',
  baseQuery: baseQuery(),
  endpoints: build => ({
    registration: build.mutation<any, any>({
      query: credentials => ({
        url: 'register/',
        method: 'POST',
        // redirect: 'follow',
        body: formDataConverter(credentials),
        responseHandler: response => response.text(),
      }),
    }),
    adminRegistration: build.mutation<any, any>({
      query: credentials => ({
        url: 'register_user/',
        method: 'POST',
        // redirect: 'follow',
        body: formDataConverter(credentials),
        responseHandler: response => response.text(),
      }),
    }),
    sendRegCode: build.mutation({
      query: credentials => ({
        url: 'code/confirm/',
        method: 'POST',
        redirect: 'follow',
        body: formDataConverter(credentials),
      }),
    }),
    invite: build.mutation({
      query: credentials => ({
        url: '/invite',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})
export const { useRegistrationMutation, useAdminRegistrationMutation, useInviteMutation, useSendRegCodeMutation } = userRegisterService
