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
  user_id: string;
  message: string;
}

export interface SendMessageResponse {
  success: boolean;
  messageId: string;
  bot_response: string;
}

export const chatgptService = createApi({
  reducerPath: 'chatgptService',
  baseQuery: baseQuery(),
  endpoints: build => ({
    fetchLatestMessages: build.query<Array<LatestMessagesResponse>, string>({
      query: (userId) => ({
        url: `/chatgpt/latest_messages/${userId}/`,
      })
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
  }),
});

export const { useFetchLatestMessagesQuery, useSendMessageMutation } = chatgptService;
export type ChatgptService = typeof chatgptService;