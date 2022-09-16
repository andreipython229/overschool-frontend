import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery,
  tagTypes: ['profile'],
  endpoints: build => ({
    fetchProfileData: build.query<any, number>({
      query: id => ({
        url: `/profiles/${id}/`,
      }),
      providesTags: ['profile'],
    }),
    updateProfile: build.mutation<any, any>({
      query: userInfo => ({
        url: `/profiles/1/`,
        method: 'PATCH',
        body: userInfo,
      }),
      invalidatesTags: ['profile'],
    }),
  }),
})

export const { useFetchProfileDataQuery, useUpdateProfileMutation } = profileService
