import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalI {
  modal: any
}

const initialState: ModalI = {
  modal: false,
}

export const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<any>) => {
      state.modal = action.payload
    },
  },
})

export const { showModal } = slice.actions

export const modalReduce = slice.reducer
