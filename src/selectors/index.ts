import { RootState } from '../store/redux/store'

export const selectUser = (state: RootState) => state.user
export const selectUserProfile = (state: RootState) => state.userProfile
export const authSelector = (state: RootState) => state.user?.auth
export const getSectionId = (state: RootState) => state.sections
export const userIdSelector = (state: RootState) => state.user.userId
export const filtersSelector = (state: RootState) => state.filters
export const schoolNameSelector = (state: RootState) => state.school.schoolName
export const contactLinkSelector = (state: RootState) => state.school.contactLink
export const schoolIdSelector = (state: RootState) => state.schoolId
export const schoolProgressSelector = (state: RootState) => state.schoolProgress
