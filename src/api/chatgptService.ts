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
  message: string;
  overai_chat_id?: number,
  language: string
}

export interface SendMessageResponse {
  success: boolean;
  messageId: number;
  bot_response: string;
}

interface ChatData {
  order: number;
  chat_name: string;
}

export interface LatestChatsResponse {
  [id: number]: ChatData;
}

export interface CreateChatPayload {
  orderData: { id: number; order: number }[];
}

interface DeleteChatRequest {
  chat_id: number;
  orderData: { id: number; order: number }[];
}

export const chatgptService = createApi({
  reducerPath: 'chatgptService',
  baseQuery: baseQuery(),
  endpoints: build => ({
    updateWelcomeMessage: build.mutation<{ success: boolean }, void>({
      query: () => ({
        url: `/chatgpt/update_welcome_message/`,
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
    fetchLatestMessages: build.query<Array<LatestMessagesResponse>, { overai_chat_id?: number }>({
      query: ({ overai_chat_id }) => ({
        url: `/chatgpt/latest_messages/${overai_chat_id}/`
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
    createChat: build.mutation<{ overai_chat_id: number }, CreateChatPayload>({
      query: (payload) => ({
        url: `/chatgpt/create_chat/`,
        method: 'POST',
        body: {
          orderData: payload.orderData
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    fetchLatestChats: build.query<LatestChatsResponse, void>({
      query: () => ({
        url: `/chatgpt/latest_chats/`,
      }),
    }),
    deleteChat: build.mutation<void, DeleteChatRequest>({
      query: ({ chat_id, orderData }) => ({
        url: `/chatgpt/delete_chat/`,
        method: 'POST',
        body: { chat_id, orderData },
      }),
    }),
    assignChatOrder: build.mutation<void, LatestChatsResponse>({
      query: (payload) => ({
        url: `/chatgpt/assign_chat_order/`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { 
  useLazyFetchWelcomeMessageQuery,
  useLazyFetchLatestMessagesQuery, 
  useSendMessageMutation, 
  useCreateChatMutation, 
  useLazyFetchLatestChatsQuery,
  useUpdateWelcomeMessageMutation,
  useDeleteChatMutation,
  useAssignChatOrderMutation,
} = chatgptService;
export type ChatgptService = typeof chatgptService;