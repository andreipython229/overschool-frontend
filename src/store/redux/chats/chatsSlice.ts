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
        chat.unread = action.payload.count;
      }
    },
    addChat: (state, action: PayloadAction<ChatI>) => {
      // console.log('Incoming data:', action.payload);
      // state.chats.push(action.payload);
      state.chats = [...state.chats, action.payload];
      // console.log('Updated state:', state.chats);
    },
    updateChat: (state, action: PayloadAction<{ chatId: string; updatedChat: ChatI }>) => {
      const index = state.chats.findIndex((c) => c.id === action.payload.chatId);
      if (index !== -1) {
        state.chats[index] = action.payload.updatedChat;
      }
    },
  },
});

export const { setChats,
  updateLastMessage,
  updateUnreadCount,
  addChat,
  updateChat } = chatsSlice.actions;

export const chatsReducer = chatsSlice.reducer;