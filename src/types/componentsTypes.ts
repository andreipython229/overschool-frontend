import { FC, MouseEvent, ReactNode } from 'react'

import { ILesson, sectionT } from './sectionT'
import { lessonIdAndTypeT } from '../components/Modal/ModalTypes'

export type setShowType = {
  setShow: () => void
  setDescriptionLesson?: (arg: string) => void
}

type argT = {
  id: number
  type: string
  formdata: FormData
}

export type AddPostT = {
  lesson: ILesson
  code?: string
  isPreview?: boolean
  lessonIdAndType?: lessonIdAndTypeT
  addFile?: (arg: argT) => void
  handleEditorChange?: (code: string | undefined) => void
}

export type ContentBtnPropsT = {
  alt: string
  text: string
  src: string
  disabled?: boolean
  func?: (event: MouseEvent) => void
}

export type AllStudentsBlockT = {
  headerText: string
}

export interface ICategories {
  id: string | number
  title: string
}

export type FiltersButtonT = {
  filteringCategoriesList: ICategories[]
}

export type FilterItemT = {
  id: string | number
  title: string
  setSelectedFilter: (args: keyof object) => void
}

export type SearchFilterT<T> = {
  name: string
  header: string
  filterTerm: string
  data: T[]
}

export type ScoresFilterT = {
  title: string
}

export interface IWithRange {
  CustomModifierNames: string
  WithRange: boolean | undefined
}

export interface IEditor {
  label?: ReactNode
  style?: string
  onToggle: (arg: string) => void
  isActive?: (style: string) => boolean
}

export type PreviousPropsT = {
  about?: string
  buttonText?: string
  onClick?: () => void
}

export type pathT = {
  path: string
  Component: FC
}

export type GlobalPreviousT = {
  about?: string
  buttonText?: string
  onClick?: () => void
}

export type dropDownItem = {
  id: number | string
  icon: ReactNode
  title: string
  bg: string
  arrow: string
  arrow_fill: string
}

export type SelectDropDownT = {
  setArrowUsersState: (arg: string[]) => void
}

export type StatisticHeaderT = {
  hideStats?: boolean
  handleHideStats?: () => void
}

export type accardionItemT = {
  module: sectionT
  moduleIndex: number
  openIndex: number
  handleToggleOpen: (index: number) => void
}
