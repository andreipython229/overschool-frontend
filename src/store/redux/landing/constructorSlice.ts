import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BlockKeys } from "Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/types/blocksControllerT";
import { initialBlocks } from "Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/constants/initialBlocks"

type BlocksSliceState = {
  blocks: BlockKeys,
  files: { [key: string]: File | Blob },
}

const initialState: BlocksSliceState = {
  blocks: initialBlocks,
  files: {},
}

export const slice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    changeBlocks: (state, action: PayloadAction<BlockKeys>) => {
      state.blocks = action.payload
    },
    rollBackBlocks: state => {
      state.blocks = initialBlocks
    },
    addFile: (state, action: PayloadAction<{key: string, file: File | Blob}>) => {
      const { key, file } = action.payload
      state.files = {...state.files, [key]: file}
    },
    changeKeys: (state, action: PayloadAction<{ index: number} >) => {
      const { index } = action.payload
      const newDict: { [key: string]: any } = {};

      for (const key in state.files) {
          const parts = key.split('_');
          const numStr = parts[parts.length - 1];
          const baseKey = parts.slice(0, -1).join('_');

          if (!isNaN(Number(numStr))) {
              const num = parseInt(numStr, 10);
              if (num >= index) {
                  const newKey = `${baseKey}_${num + 1}`;
                  newDict[newKey] = state.files[key];
              } else {
                  newDict[key] = state.files[key];
              }
          } else {
              newDict[key] = state.files[key];
          }
      }

      state.files = newDict
    },
    changeKeysAfterDel: (state, action: PayloadAction<{ index: number } >) => {
      // здесь меняются индексы на конце имён с учётом их смещения в порядке следования карточек

      const { index } = action.payload
      const newDict: { [key: string]: any } = {};

      for (const key in state.files) {
          const parts = key.split('_');
          const numStr = parts[parts.length - 1];
          const baseKey = parts.slice(0, -1).join('_');

          if (!isNaN(Number(numStr))) {
              const num = parseInt(numStr, 10);
              if (num > index) {
                  const newKey = `${baseKey}_${num - 1}`;
                  newDict[newKey] = state.files[key];
              } else {
                  newDict[key] = state.files[key];
              }
          } else {
              newDict[key] = state.files[key];
          }
      }

      state.files = newDict
    },
    removeFile: (state, action: PayloadAction<{ key: string }>) => {
      const { key } = action.payload
      const newDict = {...state.files};
      // Проверяем, существует ли старый ключ
      if (key in newDict) delete newDict[key]

      state.files = newDict
    },
    removeFiles: state => {
      state.files = {}
    }
  }
})

export const {
  changeBlocks,
  rollBackBlocks,
  addFile,
  changeKeys,
  changeKeysAfterDel,
  removeFile,
  removeFiles,
} = slice.actions

export const landingReducer = slice.reducer