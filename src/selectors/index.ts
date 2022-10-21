import { RootState } from '../store/redux/store'

export const selectUser = (state: RootState) => state.user
export const authSelector = (state: RootState) => state.user?.auth
export const getSectionId = (state: RootState) => state.sections
export const userIdSelector = (state: RootState) => state.user.userId
export const filtersSelector = (state: RootState) => state.filters

