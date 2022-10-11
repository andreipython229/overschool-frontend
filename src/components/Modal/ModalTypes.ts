import { ChangeEvent } from 'react'
import { sectionT } from '../../types/sectionT'
import { CoursesDataT } from '../../types/CoursesT'

export type lessonIdAndTypeT = {
  id: number
  type: string
}

export type SettingClassesPropsT = {
  setType: (arg: keyof object) => void
  modulesList: sectionT[]
}

export type AddEmployeeModalPropsT = {
  setShowModal: () => void
}

export type AddCourseModalPropsT = {
  setShowModal: () => void
  courses: CoursesDataT[] | undefined
}

export type AddModuleModalPropsT = {
  setType: (arg: keyof object) => void
  courseId?: string
  modulesList: sectionT[]
}

export type SettingsClassesModalPropT = {
  setType: (arg: keyof object) => void
  lessonIdAndType: lessonIdAndTypeT
  modulesList: sectionT[]
}

export type LoginModalPropsT = {
  setShowModal: (value: boolean) => void
}

export type WebinarModalPropsT = {
  setType: (arg: keyof object) => void
}

export type TestModalPropsT = {
  setType: (arg: keyof object) => void
  modulesList: sectionT[]
}

export type TasksModalPropsT = {
  setType: (arg: keyof object) => void
  modulesList: sectionT[]
}

export type ModalClassesPropsT = {
  setShowModal?: (arg: boolean) => void
  changeClasses?: (id: number) => void
  setType: (arg: keyof object) => void
}

export type RegistrationModalPropsT = {
  setShowModal: (value: boolean) => void
}

export type SettingStudentTableT = {
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
