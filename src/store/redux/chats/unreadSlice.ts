import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {chatReducer} from "./slice";

interface UnreadStateT {
  totalUnread: string;
}

const initialState: UnreadStateT = {
  totalUnread: '',
};

export const unreadSlice = createSlice({
  name: 'unread',
  initialState,
  reducers: {
    setTotalUnread: (state, action: PayloadAction<string>) => {
      state.totalUnread = action.payload;
    },
  },
});

export const { setTotalUnread } = unreadSlice.actions;

export const unreadReducer = unreadSlice.reducer;

