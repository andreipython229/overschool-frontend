import { Dispatch, SetStateAction } from 'react'
import { lessonIdAndTypeT } from '../components/Modal/ModalTypes'
import { sectionT, lessonT } from './sectionT'

export type ClassesSettingsPropsT = {
  setType: (arg: keyof object) => void
  lessonIdAndType: lessonIdAndTypeT
  deleteLesson: (arg: { id: number; type: string; schoolName: string }) => void
}

export type ModulesBlockT = {
  section: sectionT
  moduleName: string
  id: number
  lessonsList: lessonT[]
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  setType: (arg: keyof object) => void
  selectedLessonId: number | undefined
  setSelectedLessonId: Dispatch<SetStateAction<number | undefined>>
  onOpenModalModule: () => void
  setInsertAfterOrder: (order: number | undefined) => void
  setInsertAfterModuleOrder: (order: number | undefined) => void
  orderModule: number
}

export type LessonAddBlockPropsT = {
  setModulesList: Dispatch<SetStateAction<sectionT[]>>
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  modulesList: sectionT[]
  setType: (arg: keyof object) => void
  isLoading: any
  baseLessonId?: number
  courseName: string
  setInsertAfterOrder: (order: number | undefined) => void
  setInsertAfterModuleOrder: (order: number | undefined) => void
}

export type LessonsBlockT = {
  lessonsName: string
  id: number
  type: string
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  setFocusOnLesson?: () => void
  lesson: lessonT
  selected: boolean
  onPush: () => void
  onOpenModalLesson?: () => void
  openedEye?: boolean
  setInsertAfterOrder: (order: number | undefined) => void
}
