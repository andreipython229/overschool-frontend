import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type chatSliceInitialStateT = {
  chatId: string | null
}

const initialState: chatSliceInitialStateT = {
  chatId: null,
}

export const sliceChat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectChat: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload
    },
    removeChat: state => {
      state.chatId = null
    },
  },
})

export const { selectChat, removeChat } = sliceChat.actions
export const chatReducer = sliceChat.reducer
