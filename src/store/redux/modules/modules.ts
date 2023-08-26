import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sectionsT } from '../../../types/sectionT'

interface ModulesSliceInitialState {
  data: sectionsT | null;
}

const initialState: ModulesSliceInitialState = {
  data: null,
};
export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<sectionsT>) => {
      state.data = action.payload
    },
    clearModules: (state) => {
      state.data = null;
    },
  },
});

export const { setModules, clearModules } = modulesSlice.actions;

export const modulesReduce = modulesSlice.reducer;
