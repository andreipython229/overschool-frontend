import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/chatgpt/';

export interface LatestMessagesResponse {
  sender: string;
  sender_question: string;
  answer: string;
}

interface SendMessagePayload {
  userId: string;
  message: string;
}

interface SendMessageResponse {
  success: boolean;
  messageId: string;
}

export const chatgptService = {
  getLatestMessages: async (userId: string): Promise<Array<LatestMessagesResponse>> => {
    const response = await axios.get(`${BASE_URL}latest_messages/${userId}/`);
    return response.data;
  },

      sendMessage: async (payload: SendMessagePayload): Promise<SendMessageResponse> => {
        const response = await axios.post(`${BASE_URL}send_message/`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        return response.data;
      },
};