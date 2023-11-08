import { FC, MouseEvent, ReactNode } from 'react'

import { statusFilterT } from 'types/statusFilterConfigType'
import {CoursesDataT, CourseWithGroupsT, StGroupT} from 'types/CoursesT'
import { commonLessonT, sectionT } from './sectionT'
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
  lesson: commonLessonT
  code?: string
  isPreview?: boolean
  lessonIdAndType?: lessonIdAndTypeT
  addFile?: (arg: argT) => void
  deleteAudio?: (id: number) => void
  addAudio?: any
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
  invite: boolean
  headerText: string
  filterKey: string
  startMark: string | number
  startAvg: string | number
  endAvg: string | number
  endMark: string | number
  startDate: string | number
  endDate: string | number
  filters: { [key: string]: string | number }
  handleReloadTable?: () => void
  handleAddAvgFilter?: (start_avg: string, end_avg: string) => void
  removeLastActiveStartFilter?: () => void
  removeLastActiveEndFilter?: () => void
  addLastActiveFilter?: (data1: string, data2: string) => void
  addMarkFilter?: (start_mark: string, end_mark: string) => void
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
  filterKey: string
  name: string
  header: string
  filterTerm: string
  data: T[]
}

export type ScoresFilterT = {
  title: string
  addMarkFilter?: (start_mark: string, endMark: string) => void
  endMark?: string | number
  startMark?: string | number
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
  dropdownData: statusFilterT[]
  onChangeStatus?: (status: string) => void
}


export type GroupsDropDownT = {
  dropdownData: StGroupT[]
  course_id: number
  selected_group: number | null
  onChangeGroup?: (course_id: number, group_id: number | null) => void
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
