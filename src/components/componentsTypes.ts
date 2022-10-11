import { FC, MouseEvent, ReactNode } from 'react'

import { ILesson, sectionT } from '../types/sectionT'
import { IFuncUpdate } from '../utils/patchData'
import { lessonIdAndTypeT } from './Modal/ModalTypes'

export type setShowType = {
  setShow: () => void
  setDescriptionLesson?: (arg: string) => void
}

export type AddPostT = {
  lesson: ILesson
  code?: string
  isPreview?: boolean
  lessonIdAndType?: lessonIdAndTypeT
  addFile?: (arg: any) => void
  handleEditorChange?: (code: string | undefined) => void
}

export type ContentBtnPropsT = {
  alt: string
  text: string
  src: string
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

export type SearchFilterT = {
  name: string
  header: string
  data: Array<object>
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
  icon: {
    width: number
    height: number
    fill: string
    d: string
  }
  title: string
  bg: string
  viewBoxSize?: string
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
