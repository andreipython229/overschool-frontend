import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FiltersSliceState = {
  [key: string]: { [key: string]: string | number }
}

const initialState: FiltersSliceState = {
  homework: {
    status: 'Все статусы',
  },
}

export const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction<{ key: string; filters: { [key: string]: string | number } }>) => {
      const { key, filters } = action.payload

      if (!(key in state)) {
        state[key] = {}
      }

      state[key] = { ...state[key], ...filters }
    },
    clearFilters: (state, action: PayloadAction<string>) => {
      const key = action.payload

      if (state[key]) {
        state[key] = {}
      }
    },
    removeFilter: (state, action: PayloadAction<{ key: string; filterName: string }>) => {
      const { key, filterName } = action.payload

      if (state[key] && state[key][filterName]) {
        state[key][filterName] = ''
      }
    },
    removeAllFilters: state => {
      return {}
    },
  },
})

export const { addFilters, clearFilters, removeFilter, removeAllFilters } = slice.actions

export const filtersReducer = slice.reducer
