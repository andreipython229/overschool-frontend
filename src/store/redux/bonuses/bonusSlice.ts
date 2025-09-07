import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BonusT } from 'types/bonusesT'

interface StudentBonusState {
  studentBonus: BonusT
}

const initialState: StudentBonusState = {
  studentBonus: {
    id: 0,
    student_groups: [],
    logo: '',
    link: '',
    text: '',
    active: false,
    expire_date: new Date(),
  },
}

export const bonusSlice = createSlice({
  name: 'bonuses',
  initialState,
  reducers: {
    setStudentBonus: (state, action: PayloadAction<BonusT>) => {
      state.studentBonus = action.payload
    },
  },
})

export const { setStudentBonus } = bonusSlice.actions

export const bonusReducer = bonusSlice.reducer
