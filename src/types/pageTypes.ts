import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps } from 'react'

import { studentsGroupsT } from './studentsGroup'
import { CoursesDataT } from './CoursesT'
import {EmployeeT} from "./userT";
import {BonusT} from "./bonusesT";

export type CoursesMiniCardT = {
  photo?: string
  name: string
  courseId: number
  groups: studentsGroupsT[]
}
export type searchCourseBlockT = {
  groups: studentsGroupsT[]
  courses: CoursesDataT[]
}

export type CourseImgPropsT = {
  currentCourse: string
  changeCurrentCourse: (id: string) => void
  id: string
  // alt: string;
  style: object
  title: string
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
  additional_roles?: string[]
  id?: number
  employees: EmployeeT[]
  setEmployees: (arg: EmployeeT[]) => void
  isModalRenameOpen: () => void
}

export type LogoAddBlockPropsT = {
  title: string
  logoDesc: string
  aboutRequirements: string
  requirementsArr: string[]
  url?: string
  height?: number
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

export type BonusPropsT = {
  bonus: BonusT
  bonuses: BonusT[]
  setBonuses: (arg: BonusT[]) => void
  setFormBonus: (arg: BonusT) => void
  setIsEdit: (arg: boolean) => void
  setIsActivate: (arg: boolean) => void
  setShowBonusForm: (arg: boolean) => void
  groupIds: number[]
  setIsAllGroupsSelected: (arg: boolean) => void
}
