import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { formDataConverter } from '../utils/formDataConverter'
import {baseQuery} from "./baseApi";

type registrationCredentials = {
    email: string
    phone_number: string
    password: string
    password_confirmation: string
}

export const schoolCreationService = createApi({
    reducerPath: 'userRegisterService',
    baseQuery: baseQuery(),
    endpoints: builder => ({
      createSchoolOwner: builder.mutation<any, registrationCredentials>({
        query: credentials => {
          return {
            url: '/register-school-owner/',
            method: 'POST',
            body: credentials,
          }
        },
      }),
    }),
  })
  export const { useCreateSchoolOwnerMutation } = schoolCreationService
  