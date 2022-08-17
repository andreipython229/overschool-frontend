import { RootState } from '../store/redux/store'

export const selectUser = (state: RootState) => state.user
export const authSelector = (state: RootState) => state.user?.auth
export const allCoursesSelector = (state: RootState) => state.allCourses
export const modalSelector = (state: RootState) => state.modal
