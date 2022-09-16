import {ChangeEvent, FC, MouseEvent, ReactNode} from 'react'
import {SettingItemT} from "../../Pages/CoursesStats/CoursesStats";


export type AddEmployeeModalPropsT = {
  onToggle: () => void
}

export type AddCourseModalPropsT = {
  setShowModal: () => void
}

export type AddModuleModalPropsT = {
  setShowModal: (arg: boolean) => void
}

export type SettingsClassesModalPropT = {
  setShowModal: (arg: boolean) => void
}

export type LoginModalPropsT = {
  setShowModal: (value: boolean) => void
}

type SettingClassesPropsType = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
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

export type SettingStudentTable = {
  settingList: SettingItemT[]
  setShowModal: (arg: boolean) => void
  setSettingsList: (arg: SettingItemT[]) => void
}

export type SettingsGroupModalPropsT = {
  closeModal: () => void
}

export type NavSwitcherPropsT = {
  changeActiveLink: (id: number) => void
  activeLink: number
}

export type CreateGroupModalPropsT = {
  setShowModal: (arg: boolean) => void
  addNameGroup: (e: ChangeEvent<HTMLInputElement>) => void
  nameGroup: string
}

export type AddStudentModalPropsT = {
  setShowModal: (arg: boolean) => void
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void
  studentEmail: string
}