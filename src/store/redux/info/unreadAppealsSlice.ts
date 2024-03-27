import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UnreadAppealsStateT {
  totalUnreadAppeals: number;
}

const initialState: UnreadAppealsStateT = {
  totalUnreadAppeals: 0,
};

export const unreadAppealsSlice = createSlice({
  name: 'unreadAppeals',
  initialState,
  reducers: {
    setTotalUnreadAppeals: (state, action: PayloadAction<number>) => {
      state.totalUnreadAppeals = action.payload;
    },
  },
});

export const { setTotalUnreadAppeals } = unreadAppealsSlice.actions;

export const unreadAppealsReducer = unreadAppealsSlice.reducer;

