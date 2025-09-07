import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { baseQueryWithReauth } from './baseQueryReauth'

type registrationCredentials = {
  school_name: string
  email: string
  phone_number: string
  password: string
  password_confirmation: string
  tariff: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
}

export const schoolCreationService = createApi({
  reducerPath: 'schoolCreationService',
  tagTypes: ['createOwner'],
  baseQuery: baseQueryWithReauth,
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
    createSchoolOwnerRef: build.mutation<any, { credentials: registrationCredentials; ref: string }>({
      query: data => {
        return {
          url: `/register-school-owner/${data.ref}/`,
          method: 'POST',
          body: data.credentials,
          redirect: 'follow',
          responseHandler: response => response.text(),
        }
      },
      invalidatesTags: ['createOwner'],
    }),
  }),
})
export const { useCreateSchoolOwnerMutation, useCreateSchoolOwnerRefMutation } = schoolCreationService
