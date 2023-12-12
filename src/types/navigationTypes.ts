import { Dispatch, SetStateAction } from 'react'
import { lessonIdAndTypeT } from '../components/Modal/ModalTypes'
import { sectionT, lessonT } from './sectionT'

export type ClassesSettingsPropsT = {
  setType: (arg: keyof object) => void
  lessonIdAndType: lessonIdAndTypeT
  deleteLesson: (arg: {id: number, type: string, schoolName: string}) => void
}

export type ModulesBlockT = {
  moduleName: string
  id: number
  lessonsList: lessonT[]
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  setType: (arg: keyof object) => void
  selectedLessonId: number | undefined
  setSelectedLessonId: Dispatch<SetStateAction<number | undefined>>
}

export type LessonAddBlockPropsT = {
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  modulesList: sectionT[]
  setType: (arg: keyof object) => void
  isLoading: any
}

export type LessonsBlockT = {
  lessonsName: string
  id: number
  type: string
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  lesson: lessonT
  selected: boolean
  onPush: () => void
}
