import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryReauth'
import {
  PublicWebinar,
  ChatMessagesResponse,
  CreateWebinar,
  Autowebinar,
  CreateAutowebinarPayload,
  UpdateAutowebinarPayload,
} from 'types/autowebinarsT'

export const autowebinarsService = createApi({
  reducerPath: 'autowebinarsService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Autowebinars', 'PlaybackSessions'],
  endpoints: build => ({
    getPublicWebinar: build.query<PublicWebinar, { slug: string }>({
      query: ({ slug }) => `/public/webinar/${slug}/`,
    }),

    getPublicChatMessages: build.query<ChatMessagesResponse, { playback_session_id: number }>({
      query: ({ playback_session_id }) => `/public/webinar_chat/playback/${playback_session_id}/messages/`,
    }),

    createAutowebinar: build.mutation<Autowebinar, CreateAutowebinarPayload>({
      query: ({ schoolName, formData }) => ({
        url: `/${schoolName}/autowebinars/`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Autowebinars'],
    }),

    updateAutowebinar: build.mutation<Autowebinar, UpdateAutowebinarPayload>({
      query: ({ id, schoolName, formData }) => ({
        url: `/${schoolName}/autowebinars/${id}/`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Autowebinars'],
    }),

    deleteAutowebinar: build.mutation<void, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/autowebinars/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Autowebinars'],
    }),

    fetchAllWebinars: build.query<Autowebinar[], { schoolName: string }>({
      query: ({ schoolName }) => `/${schoolName}/autowebinars/`,
      providesTags: ['Autowebinars'],
    }),
  }),
})

export const {
  useGetPublicWebinarQuery,
  useGetPublicChatMessagesQuery,
  useCreateAutowebinarMutation,
  useUpdateAutowebinarMutation,
  useDeleteAutowebinarMutation,
  useFetchAllWebinarsQuery,
} = autowebinarsService
