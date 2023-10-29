import { FormEvent } from 'react'
import { sectionT } from '../../types/sectionT'
import { CoursesDataT } from '../../types/CoursesT'
import {EmployeeT} from 'types/userT'

import { studentsGroupsT } from '../../types/studentsGroup'
import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";

export type lessonIdAndTypeT = {
  id: number
  type: string
}

export type SettingClassesPropsT = {
  setType: (arg: keyof object) => void
  modulesList: sectionT[]
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
}

export type AddEmployeeModalPropsT = {
  employees: EmployeeT[]
  setEmployees: (arg: EmployeeT[]) => void
  setShowModal: () => void
}

export type AddEmpoyeeModalExtensions = {
  handleCreatEmployee: (event: FormEvent<HTMLFormElement>) => void
  setEmailUser: (arg: string) => void
  emailUser: string
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
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
}

export type TasksModalPropsT = {
  setType: (arg: keyof object) => void
  modulesList: sectionT[]
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
}

export type ModalClassesPropsT = {
  setShowModal?: (arg: boolean) => void
  changeClasses?: (id: number) => void
  setType: (arg: keyof object) => void
}

export type RegistrationModalPropsT = {
  setShowModal: (value: boolean) => void
  setCodeModal: (value: boolean) => void
}

export type RegCodeModalPropsT = {
  setCodeModal: (value: boolean) => void
  email?: string
}
export type SettingStudentTableT = {
  setShowModal: (arg?: boolean) => void
  tableId: number
}

export type SettingsGroupModalPropsT = {
  closeModal: () => void
  teacherId?: number
  students?: number[]
  sequence?: boolean
  blockHomeworks?: boolean
  courseId?: number
  groupId: number
  name: string

}

export type CreateGroupModalPropsT = {
  setShowModal: (arg: boolean) => void
  courseId: string
}

export type AddStudentModalPropsT = {
  setShowModal: () => void
  courses: CoursesDataT[]
}

export type LimitModalPropsT = {
  setShowLimitModal: () => void
  message: string
  setShowMainModal: () => void
}
