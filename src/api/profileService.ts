import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { profileT, changePasswordProfileT } from '../types/profileT'
import { baseQuery } from './baseApi'

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: baseQuery(),
  tagTypes: ['profile', 'password_change'],
  endpoints: build => ({
    fetchProfileData: build.query<profileT[], void>({
      query: () => ({
        url: `/profile/`,
      }),
      providesTags: ['profile'],
    }),
    updateProfile: build.mutation<void, any>({
      query: ({ userInfo, id }) => ({
        url: `/profile/${id}/`,
        method: 'PATCH',
        body: userInfo,
      }),
      invalidatesTags: ['profile'],
    }),
    changePassword: build.mutation<string, changePasswordProfileT>({
      query: passwordInfo => ({
        url: `/change-password/`,
        method: 'POST',
        body: passwordInfo,
      }),
      invalidatesTags: ['password_change'],
    }),
  }),
})

export const { useFetchProfileDataQuery, useLazyFetchProfileDataQuery, useUpdateProfileMutation, useChangePasswordMutation } = profileService
