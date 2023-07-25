import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { formDataConverter } from '../utils/formDataConverter'
import {baseQuery} from "./baseApi";

export const userRegisterService = createApi({
  reducerPath: 'userRegisterService',
  baseQuery: baseQuery(),
  endpoints: builder => ({
    registration: builder.mutation({
      query: credentials => {
        const formdata = formDataConverter(credentials)
        return {
          url: 'register/',
          method: 'POST',
          redirect: 'follow',
          body: formdata,
        }
      },
    }),
    sendRegCode: builder.mutation({
      query: credentials => {
        const formdata = formDataConverter(credentials)
        return {
          url: 'code/confirm/',
          method: 'POST',
          redirect: 'follow',
          body: formdata,
        }
      },
    }),
    invite: builder.mutation({
      query: credentials => {
        return {
          url: '/invite',
          method: 'POST',
          body: credentials,
        }
      },
    }),
  }),
})
export const { useRegistrationMutation, useInviteMutation, useSendRegCodeMutation } = userRegisterService
