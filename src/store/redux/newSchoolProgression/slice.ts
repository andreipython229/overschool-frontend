import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITask {
  task: string
  completed: boolean
}

export interface IProgressionState {
  total_tasks: number
  total_completed_tasks: number
  completion_percentage: number
  tasks: ITask[]
}

interface IProgress {
  data: IProgressionState
}

const initialState: IProgress = {
  data: { total_tasks: 0, total_completed_tasks: 0, completion_percentage: 0, tasks: [] },
}

export const sliceSchoolProgressTasks = createSlice({
  name: 'schoolTasks',
  initialState,
  reducers: {
    updateSchoolTask: (state, action: PayloadAction<IProgressionState>) => {
      state.data = action.payload
    },
  },
})

export const { updateSchoolTask } = sliceSchoolProgressTasks.actions
export const schoolProgressReducer = sliceSchoolProgressTasks.reducer
