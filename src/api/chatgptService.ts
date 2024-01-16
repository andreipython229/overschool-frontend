import { baseQuery } from './baseApi'
import { createApi } from '@reduxjs/toolkit/dist/query/react';


export interface UserQuestion {
  sender?: string;
  sender_question: string;
}

export interface BotAnswer {
  sender?: string;
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
  messageId: string;
  bot_response: string;
}

export interface LatestChatsResponse {
  [id: number]: string;
}

export const chatgptService = createApi({
  reducerPath: 'chatgptService',
  baseQuery: baseQuery(),
  endpoints: build => ({
    fetchLatestMessages: build.query<Array<LatestMessagesResponse>, { userId: string; overai_chat_id?: string }>({
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
    createChat: build.mutation<{overai_chat_id: number}, string>({
      query: (payload) => ({
        url: `/chatgpt/create_chat/`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    fetchLatestChats: build.query<LatestChatsResponse, string>({
      query: (userId) => ({
        url: `/chatgpt/latest_chats/${userId}/`,
      }),
    }),
  }),
});

export const { 
  useFetchLatestMessagesQuery, 
  useSendMessageMutation, 
  useCreateChatMutation, 
  useFetchLatestChatsQuery 
} = chatgptService;
export type ChatgptService = typeof chatgptService;