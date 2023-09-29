import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'

type registrationCredentials = {
  school_name: string
  email: string
  phone_number: string
  password: string
  password_confirmation: string
}

export const schoolCreationService = createApi({
  reducerPath: 'schoolCreationService',
  tagTypes: ['createOwner'],
  baseQuery: baseQuery(),
  endpoints: build => ({
    createSchoolOwner: build.mutation<any, registrationCredentials>({
      query: credentials => {
        return {
          url: '/register-school-owner/',
          method: 'POST',
          body: credentials,
          redirect: 'follow',
          responseHandler: response => response.text(),
        }
      },
      invalidatesTags: ['createOwner'],
    }),
  }),
})
export const { useCreateSchoolOwnerMutation } = schoolCreationService
