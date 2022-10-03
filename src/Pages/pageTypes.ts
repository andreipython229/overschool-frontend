import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps } from 'react'

import { studentsGroupsT } from '../types/studentsGroup'
import { CoursesDataT } from '../types/CoursesT'

export type CoursesMiniCardT = {
  photo_url?: string
  name: string
  courseId: string
  groups: studentsGroupsT[]
}
export type searchCourseBlockT = {
  groups: studentsGroupsT[]
  courses: CoursesDataT[]
}

export type SettingItemT = {
  admin: number
  student_table_id: number
  students_table_info: studentGroupInfoT[]
}

export type studentGroupInfoT = {
  order: number
  name: string
  checked: boolean
  id: number
}

export type InitPageHeaderPT = {
  setLoginShow: (show: boolean) => void
  setRegistrationShow: (show: boolean) => void
}

export type CourseImgPropsT = {
  currentCourse: string
  changeCurrentCourse: (id: string) => void
  id: string
  // alt: string;
  style: object
  title: string
}

export type AboutUserPropsT = {
  sex: string
  onChangeUserInfo?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export type UserLogsPropsT = {
  contacts: string
  whatDoing: string
  time: string
}

export type EmployeePropsT = {
  avatar: string
  name: string
  contact: string
  role: string
}

export type EmployeesPropsT = {
  openModal: () => void
}

export type LogoAddBlockPropsT = {
  title: string
  logoDesc: string
  aboutRequirements: string
  requirementsArr: string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type NavAccountBtnPropsT = DefaultButtonPropsType & {
  text: string
  path: string
}
export interface IIsActive {
  isActive?: boolean
}
