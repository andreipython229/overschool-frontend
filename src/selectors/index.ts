import { RootState } from '../store/redux/store'

export const selectUser = (state: RootState) => state.user
export const authSelector = (state: RootState) => state.user?.auth
export const modalSelector = (state: RootState) => state.modal
export const platformSelector = (state: RootState) => state.platform
export const getSectionId = (state: RootState) => state.sections
