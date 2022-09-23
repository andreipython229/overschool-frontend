import { ChangeEvent } from 'react'
import { SettingItemT } from '../../Pages/CoursesStats/coursesStatsTypes'

export type SettingClassesPropsT = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
}

export type AddEmployeeModalPropsT = {
  onToggle: () => void
}

export type AddCourseModalPropsT = {
  setShowModal: () => void
}

export type AddModuleModalPropsT = {
  setShowModal: (arg: boolean) => void
  courseId: string
}

export type SettingsClassesModalPropT = {
  setShowModal: (arg: boolean) => void
  lessonId: string | number
  modulesList: any
}

export type LoginModalPropsT = {
  setShowModal: (value: boolean) => void
}

export type WebinarModalPropsT = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
}

export type TestModalPropsT = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
}

export type TasksModalPropsT = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
}

export type ModalClassesPropsT = {
  setShowModal: (arg: boolean) => void
  changeClasses: (id: number) => void
}

export type RegistrationModalPropsT = {
  setShowModal: (value: boolean) => void
}

export type SettingStudentTableT = {
  settingList: SettingItemT[]
  setShowModal: (arg?: boolean) => void
  setSettingsList: (arg: SettingItemT[]) => void
}

export type SettingsGroupModalPropsT = {
  closeModal: () => void
  groupId: number
  name: string
}
export type NavSwitcherPropsT = {
  changeActiveLink: (id: number) => void
  activeLink: number
}

export type CreateGroupModalPropsT = {
  setShowModal: (arg: boolean) => void
  courseId: string
}

export type AddStudentModalPropsT = {
  setShowModal: (arg: boolean) => void
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void
  studentEmail: string
}
