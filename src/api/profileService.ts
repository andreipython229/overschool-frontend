import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['profile'],
  endpoints: build => ({
    fetchProfileData: build.query({
      query: id => ({
        url: `/profiles/${id}/`,
      }),
      providesTags: ['profile'],
    }),
    updateProfile: build.mutation({
      query: ({userInfo, id}) => ({
        url: `/profiles/${id}/`,
        method: 'PATCH',
        body: userInfo,
      }),
      invalidatesTags: ['profile'],
    }),
  }),
})

export const { useFetchProfileDataQuery, useUpdateProfileMutation } = profileService
