import { configureStore } from '@reduxjs/toolkit'
import { chatgptService } from '../../../api/chatgptService'
import { feedbacksService } from '../../../api/feedbacksService' // ← добавь

const store = configureStore({
  reducer: {
    [chatgptService.reducerPath]: chatgptService.reducer,
    [feedbacksService.reducerPath]: feedbacksService.reducer, // ← добавь
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(chatgptService.middleware).concat(feedbacksService.middleware), // ← добавь
})

export default store

export const chatgptReducer = chatgptService.reducer
