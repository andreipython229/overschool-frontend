import { createApi } from '@reduxjs/toolkit/dist/query/react'
// import { io } from 'socket.io-client'

import { baseQuery } from './baseApi'
import { Chats, ChatI, Messages, MessageI } from 'types/chatsT'

export const chatsService = createApi({
  reducerPath: 'chatsService',
  baseQuery: baseQuery,
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
    // fetchMessages: build.query<Messages, string>({
    //   queryFn: id => ({ data: [] }),
    //   async onCacheEntryAdded(id, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
    //     try {
    //       await cacheDataLoaded
    //       // the /chat-messages endpoint responded already

    //       const socket = io(`wss://${process.env.REACT_APP_HOST}/chats/${id}/messages`, { withCredentials: true })

    //       socket.on('connect', () => {
    //         // socket.emit(ChatEvent.RequestAllMessages)
    //         console.log('connected')
    //       })

    //       // socket.on('messages', (messages: Messages) => {
    //       //   updateCachedData(draft => {
    //       //     draft.concat(messages)
    //       //   })
    //       // })

    //       // socket.on('all_messages', (messages: Messages) => {
    //       //   updateCachedData(draft => {
    //       //     draft.splice(0, draft.length, ...messages)
    //       //   })
    //       // })

    //       // socket.on('recieve_all_mes', (message: MessageI) => {
    //       //   updateCachedData(draft => {
    //       //     draft.push(message)
    //       //   })
    //       // })

    //       await cacheEntryRemoved

    //       socket.off('connect')
    //       // socket.off('all_messages')
    //       // socket.off('recieve_all_mes')
    //     } catch {
    //       // if cacheEntryRemoved resolved before cacheDataLoaded,
    //       // cacheDataLoaded throws
    //     }
    //   },
    // }),
  }),
})

export const { useFetchChatsQuery, useLazyFetchChatQuery } = chatsService
