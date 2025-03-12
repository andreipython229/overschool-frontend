import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITariff } from 'types/userT'

interface ITariffState {
  data: ITariff | null
}

const initialState: ITariffState = {
  data: null,
}

const tariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {
    setTariff: (state, action: PayloadAction<ITariff>) => {
      state.data = action.payload
    },
    clearTariffState: (state): void => {
      state.data = null
    },
  },
})

export const { setTariff, clearTariffState } = tariffSlice.actions
export const tariffReducer = tariffSlice.reducer
