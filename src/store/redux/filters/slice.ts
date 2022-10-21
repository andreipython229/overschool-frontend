import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialState {
  filters: { [key: string]: string | number }
}

const initialState: initialState = {
  filters: {
    status: 'Все статусы',
    course_name: '',
    homework_name: '',
    start_mark: '',
    end_mark: '',
    start_date: '',
    end_date: '',
  },
}

export const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction<{ [key: string]: string | number }>) => {
      const { payload } = action
      state.filters = { ...state.filters, ...payload }
    },
  },
})

export const { addFilters } = slice.actions

export const filtersReducer = slice.reducer
