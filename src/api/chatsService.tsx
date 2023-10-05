import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { Chats, ChatI, Messages, MessageI, PersonalChatI } from 'types/chatsT'

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
    patchChat: build.mutation<void, { formdata: FormData;}>({
      query: arg => {
        return {
          url: `/chats/${arg.formdata.get('chat_uuid')}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['chats'],
    }),
    createPersonalChat: build.mutation<PersonalChatI, FormData>({
      query: personalChat => {
        const teacherId = Number(personalChat.get('teacher_id'))
        const studentId = Number(personalChat.get('student_id'))
        return {
          url: `/chats/create_personal_chat/?teacher_id=${teacherId}&student_id=${studentId}`,
          method: 'POST',
          body: personalChat,
        }
      },
      invalidatesTags:['chats']
    }),
  }),
})

export const {
  useLazyFetchMessagesQuery,
  useFetchChatsQuery,
  useLazyFetchChatQuery ,
  useCreatePersonalChatMutation,
  usePatchChatMutation} = chatsService
