import { ChangeEvent } from 'react'
import { LessonT } from '../../Pages/School/Navigations/navigationTypes'

export type ModulesT = {
  section_name: string
  section: number
  lessons: LessonT[]
}
export type lessonIdAndTypeT = {
  id: number
  type: string
}

export type SettingClassesPropsT = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
  modulesList: ModulesT[]
}

export type AddEmployeeModalPropsT = {
  setShowModal: () => void
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
  lessonIdAndType: lessonIdAndTypeT
  modulesList: ModulesT[]
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
  modulesList: ModulesT[]
}

export type TasksModalPropsT = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
  modulesList: ModulesT[]
}

export type ModalClassesPropsT = {
  setShowModal: (arg: boolean) => void
  changeClasses: (id: number) => void
}

export type RegistrationModalPropsT = {
  setShowModal: (value: boolean) => void
}

export type SettingStudentTableT = {
  toggleSettingModal: boolean
  setShowModal: (arg?: boolean) => void
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
