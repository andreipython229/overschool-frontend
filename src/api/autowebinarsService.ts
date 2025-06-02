import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryReauth';
import { PublicWebinar, ChatMessagesResponse, CreateWebinar, Autowebinar, CreateAutowebinarPayload } from 'types/autowebinarsT'

export const autowebinarsService = createApi({
  reducerPath: 'autowebinarsService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Autowebinars', 'PlaybackSessions'],
  endpoints: (build) => ({
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
      })
    }),
});

export const {
  useGetPublicWebinarQuery,
  useGetPublicChatMessagesQuery,
  useCreateAutowebinarMutation,
} = autowebinarsService;
