import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store/redux/store'

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.user?.token

      if (token) {
        headers.set('Authenticate', `Token ${token}`)
        headers.set('mode', 'no-cors')
      }
      return headers
    },
  }),

  tagTypes: ['profile'],
  endpoints: build => ({
    fetchProfileData: build.query<any, number>({
      query: id => ({
        url: `/profiles/${id}/`,
      }),
      providesTags: ['profile'],
    }),
    updateProfile: build.mutation<any, any>({
      query: (userInfo) => ({
        url: `/profiles/1/`,
        method: 'PATCH',
        body: userInfo,
      }),
      invalidatesTags: ['profile'],
    }),
  }),
})

export const { useFetchProfileDataQuery, useUpdateProfileMutation } = profileService
