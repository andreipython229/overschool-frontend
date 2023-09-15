import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { Chats, ChatI, Messages, MessageI } from 'types/chatsT'

export const chatsService = createApi({
  reducerPath: 'chatsService',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['chats'],
  endpoints: build => ({
    fetchChats: build.query<Chats, void>({
      query: () => '/chats/',
      providesTags: ['chats'],
    }),
    fetchChat: build.query<ChatI, string>({
      query: id => `/chats/${id}`,
      providesTags: ['chats'],
    }),
    fetchMessages: build.query<Messages, string>({
      query: id => `/chats/${id}/messages`,
      providesTags: ['chats'],
    }),
  }),
})

export const { useLazyFetchMessagesQuery, useFetchChatsQuery, useLazyFetchChatQuery } = chatsService
