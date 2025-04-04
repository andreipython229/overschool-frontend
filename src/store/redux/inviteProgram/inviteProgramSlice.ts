import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInviteProgramResp } from 'api/apiTypes'

interface InviteProgramStateT {
  data: { id: number; link: string; is_active: boolean; groups: number[] } | null
}

const initialState: InviteProgramStateT = {
  data: null,
}

export const inviteProgramSlice = createSlice({
  name: 'inviteProgram',
  initialState,
  reducers: {
    setInviteProgram: (state, action: PayloadAction<IInviteProgramResp>) => {
      state.data = action.payload
    },
    clearInviteProgramData: state => {
      state.data = null
    },
  },
})

export const { setInviteProgram, clearInviteProgramData } = inviteProgramSlice.actions

export const inviteProgramReducer = inviteProgramSlice.reducer
