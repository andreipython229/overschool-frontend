import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionsI {
  section_id: number
}

const initialState: SectionsI = {
  section_id: 0,
}

export const slice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    getSectionId: (state, action: PayloadAction<number>) => {
      state.section_id = action.payload
    },
  },
})

export const { getSectionId } = slice.actions

export const sectionsReduce = slice.reducer
