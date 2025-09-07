import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MeetingCountState {
  totalMeetingCount: number
}

const initialState: MeetingCountState = {
  totalMeetingCount: 0,
}

export const meetingCountSlice = createSlice({
  name: 'meetingCount',
  initialState,
  reducers: {
    setTotalMeetingCount: (state, action: PayloadAction<number>) => {
      state.totalMeetingCount = action.payload
    },
  },
})

export const { setTotalMeetingCount } = meetingCountSlice.actions

export const meetingReducer = meetingCountSlice.reducer
