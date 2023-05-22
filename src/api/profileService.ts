import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { profileT, changePasswordProfileT } from '../types/profileT'
import { baseQuery } from './baseApi'

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: baseQuery,
  tagTypes: ['profile', 'password_change'],
  endpoints: build => ({
    fetchProfileData: build.query<profileT, number>({
      query: id => ({
        url: `/profiles/${id}/`,
      }),
      providesTags: ['profile'],
    }),
    updateProfile: build.mutation<void, any>({
      query: ({ userInfo, id }) => ({
        url: `/profiles/${id}/`,
        method: 'PATCH',
        body: userInfo,
      }),
      invalidatesTags: ['profile'],
    }),
    changePassword: build.mutation<string, changePasswordProfileT>({
      query: passwordInfo => ({
        url: `/password_change/`,
        method: 'POST',
        body: passwordInfo,
      }),
      invalidatesTags: ['password_change'],
    }),
  }),
})

export const { useFetchProfileDataQuery, useUpdateProfileMutation, useChangePasswordMutation } = profileService
