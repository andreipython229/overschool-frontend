import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { profileT, changePasswordProfileT } from '../types/profileT'
import { baseQuery } from './baseApi'
import { baseQueryWithReauth } from './baseQueryReauth'

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['profile', 'password_change', 'email_confirm'],
  endpoints: build => ({
    fetchProfileData: build.query<profileT[], void>({
      query: () => ({
        url: `/profile/`,
      }),
      providesTags: ['profile'],
    }),
    updateProfile: build.mutation<profileT, any>({
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
    confirmEmail: build.mutation<any, any>({
      query: tokenInfo => ({
        url: `/email-confirm/`,
        method: 'POST',
        body: tokenInfo,
        responseHandler: response => response.text(),
      }),
      invalidatesTags: ['email_confirm'],
    }),
  }),
})

export const {
  useFetchProfileDataQuery,
  useLazyFetchProfileDataQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useConfirmEmailMutation,
} = profileService
