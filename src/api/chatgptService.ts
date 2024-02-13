import { baseQuery } from './baseApi'
import { createApi } from '@reduxjs/toolkit/dist/query/react';


export interface UserQuestion {
  sender?: number;
  sender_question: string;
}

export interface BotAnswer {
  sender?: number;
  answer: string;
}

export interface LatestMessagesResponse {
  userQuestions: Array<UserQuestion>;
  botAnswers?: Array<BotAnswer>;
}

export interface SendMessagePayload {
  user_id: number;
  message: string;
  overai_chat_id?: number,
}

export interface SendMessageResponse {
  success: boolean;
  messageId: number;
  bot_response: string;
}

export interface LatestChatsResponse {
  [id: number]: string;
}

export const chatgptService = createApi({
  reducerPath: 'chatgptService',
  baseQuery: baseQuery(),
  endpoints: build => ({
    updateWelcomeMessage: build.mutation<{ success: boolean }, number>({
      query: (userId) => ({
        url: `/chatgpt/update_welcome_message/${userId}/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    fetchWelcomeMessage: build.query<{ show_welcome_message: boolean }, void>({
      query: () => ({
        url: `/chatgpt/user_welcome_message/`,
      }),
    }),
    fetchLatestMessages: build.query<Array<LatestMessagesResponse>, { userId: number; overai_chat_id?: number }>({
      query: ({ userId, overai_chat_id }) => ({
        url: `/chatgpt/latest_messages/${userId}/${overai_chat_id}/`
      }),
    }),
    sendMessage: build.mutation<SendMessageResponse, SendMessagePayload>({
      query: (payload) => ({
        url: '/chatgpt/send_message/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    createChat: build.mutation<{ overai_chat_id: number }, { user_id: number }>({
      query: (payload) => ({
        url: `/chatgpt/create_chat/`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    deleteChats: build.mutation<void, number>({
      query: (userId) => ({
        url: `/chatgpt/delete_chats/${userId}/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    fetchLatestChats: build.query<LatestChatsResponse, number>({
      query: (userId) => ({
        url: `/chatgpt/latest_chats/${userId}/`,
      }),
    }),
  }),
});

export const { 
  useFetchWelcomeMessageQuery,
  useFetchLatestMessagesQuery, 
  useSendMessageMutation, 
  useCreateChatMutation, 
  useFetchLatestChatsQuery,
  useDeleteChatsMutation,
  useUpdateWelcomeMessageMutation
} = chatgptService;
export type ChatgptService = typeof chatgptService;