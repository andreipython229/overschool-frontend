import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FiltersSliceState = {
  filters: { [key: string]: string | number }
}

const initialState: FiltersSliceState = {
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
    clearFilters: state => {
      state.filters = { ...initialState.filters }
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const filterKey = action.payload as keyof FiltersSliceState
      if (state.filters[filterKey]) {
        state.filters[filterKey] = ''
      }
    },
  },
})

export const { addFilters, clearFilters, removeFilter } = slice.actions

export const filtersReducer = slice.reducer
