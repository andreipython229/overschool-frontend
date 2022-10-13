import { lessonIdAndTypeT } from '../../../components/Modal/ModalTypes'
import { sectionT, lessonT } from '../../../types/sectionT'

export type ClassesSettingsPropsT = {
  setType: (arg: keyof object) => void
  lessonIdAndType: lessonIdAndTypeT
  deleteLesson: (arg: lessonIdAndTypeT) => void
}

export type ModulesBlockT = {
  moduleName: string
  id: number
  lessonsList: lessonT[]
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  setType: (arg: keyof object) => void
}

export type LessonAddBlockPropsT = {
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  modulesList: sectionT[]
  setType: (arg: keyof object) => void
}

export type LessonsBlockT = {
  lessonsName: string
  id: number
  type: string
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
}
