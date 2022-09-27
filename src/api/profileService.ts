import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: baseQueryWithReauth,
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
