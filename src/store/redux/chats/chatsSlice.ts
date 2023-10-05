import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatI } from '../../../types/chatsT'

interface ChatsState {
  chats: ChatI[];
}

const initialState: ChatsState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatI[]>) => {
      state.chats = action.payload;
    },
    updateLastMessage: (state, action: PayloadAction<{ chatId: string; message: string }>) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.last_message.content = action.payload.message;
      }
    },
    updateUnreadCount: (state, action: PayloadAction<{ chatId: string; count: number }>) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.unread_count = action.payload.count;
      }
    },
  },
});

export const { setChats, updateLastMessage, updateUnreadCount } = chatsSlice.actions;

export const chatsReducer = chatsSlice.reducer;