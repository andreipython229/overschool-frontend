import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps } from 'react'

import { studentsGroupT } from '../types/studentsGroup'
import { CoursesT } from '../types/CoursesT'

export type CoursesMiniCardT = {
  photo_url?: string
  name: string
  courseId: string
  groups: studentsGroupT[]
}
export type searchCourseBlockT = {
  groups: studentsGroupT[]
  courses: CoursesT[]
}

export type SettingItemT = {
  id: number
  order: number
  name: string
  checked: boolean
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
  onToggle: () => void
}

export type LogoAddBlockPropsT = {
  title: string
  logotype: string
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

export type CoursePagePropsT = {
  setShowModal?: () => void
  courses: CoursesT[]
}
