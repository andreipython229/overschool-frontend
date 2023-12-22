import axios from 'axios';
import { baseQuery } from './baseApi'

const BASE_URL = ' /api/chatgpt/';

export interface LatestMessagesResponse {
  sender?: string;
  sender_question: string;
  answer: string;
}

export interface SendMessagePayload {
  userId: string;
  message: string;
}

export interface SendMessageResponse {
  success: boolean;
  messageId: string;
  bot_response: string;
}


export const chatgptService = {
  baseQuery: baseQuery(),
  getLatestMessages: async (userId: string): Promise<Array<LatestMessagesResponse>> => {
    const response = await axios.get(`latest_messages/${userId}/`);
    return response.data;
  },

  sendMessage: async (payload: SendMessagePayload): Promise<SendMessageResponse> => {
    
    const response = await axios.post(`send_message/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
      
    return response.data.bot_response;
  },
};

export type ChatgptService = typeof chatgptService;

export default chatgptService;

// import axios from 'axios';
// import { baseQuery } from './baseApi'
// import { createApi } from '@reduxjs/toolkit/dist/query/react';


// const BASE_URL = process.env.REACT_APP_BASE_URL_HOST + '/api/chatgpt/';

// export interface LatestMessagesResponse {
//   sender?: string;
//   sender_question: string;
//   answer: string;
// }

// export interface SendMessagePayload {
//   userId: string;
//   message: string;
// }

// export interface SendMessageResponse {
//   success: boolean;
//   messageId: string;
//   bot_response: string;
// }

// export const chatgptService = createApi({
//   reducerPath: 'chatgptService',
//   baseQuery: baseQuery('/api'),
//   endpoints: (builder) => ({
//     getLatestMessages: builder.query<Array<LatestMessagesResponse>, string>({
//       query: (userId) => `latest_messages/${userId}/`,
//     }),
//     sendMessage: builder.mutation<SendMessageResponse, SendMessagePayload>({
//       query: (payload) => ({
//         url: 'send_message/',
//         method: 'POST',
//         body: payload,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }),
//     }),
//   }),
// });

// export const { useGetLatestMessagesQuery, useSendMessageMutation } = chatgptService;
// export type ChatgptService = typeof chatgptService;