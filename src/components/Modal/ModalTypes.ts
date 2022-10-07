import { ChangeEvent } from 'react'
import { LessonT } from '../../Pages/School/Navigations/navigationTypes'
import { CoursesDataT } from '../../types/CoursesT'

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
  setType: (arg: keyof object) => void
  modulesList: ModulesT[]
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
  modulesList: ModulesT[]
}

export type SettingsClassesModalPropT = {
  setType: (arg: keyof object) => void
  lessonIdAndType: lessonIdAndTypeT
  modulesList: ModulesT[]
}

export type LoginModalPropsT = {
  setShowModal: (value: boolean) => void
}

export type WebinarModalPropsT = {
  setType: (arg: keyof object) => void
}

export type TestModalPropsT = {
  setType: (arg: keyof object) => void
  modulesList: ModulesT[]
}

export type TasksModalPropsT = {
  setType: (arg: keyof object) => void
  modulesList: ModulesT[]
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
