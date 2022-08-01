// Define a type for the slice state
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlatformI {
  logotype: string | null;
  favicon: string | null;
  projectName: string;
}

// Define the initial state using that type
const initialState: PlatformI = {
  logotype: null,
  favicon: null,
  projectName: "Без названия",
};

export const slice = createSlice({
  name: "course",
  initialState,
  reducers: {
    changeLogo: (state, action: PayloadAction<string>) => {
      state.logotype = action.payload;
    },
    changeFavicon: (state, action: PayloadAction<string>) => {
      state.favicon = action.payload;
    },
    changeProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
  },
});

export const { changeLogo, changeFavicon, changeProjectName } = slice.actions;

export const platformReduce = slice.reducer;
