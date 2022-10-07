import { lessonIdAndTypeT } from '../../../components/Modal/ModalTypes'

export type ClassesSettingsPropsT = {
  setType: (arg: keyof object) => void
  lessonIdAndType: any
}

export interface ILesson {
  audio: null | File
  audio_url: string
  author_id: number | string
  code: null | string
  created_at: string | Date
  description: string
  file: null | File
  lesson_id: number | string
  name: string
  order: null | number
  published: boolean
  section: number | string
  updated_at: string
  video: string
}

export type LessonT = {
  id: number
  name: string
  order: number
  balls: number
  type: keyof object
}

export type modulesListT = {
  section_name: string
  section: number
  lessons: LessonT[]
}

export type ModulesBlockT = {
  moduleName: string
  id: number
  lessonsList: LessonT[]
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  setType: (arg: keyof object) => void
}

export type LessonAddBlockPropsT = {
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  modulesList: modulesListT[]
  setType: (arg: keyof object) => void
}

export type LessonsBlockT = {
  lessonsName: string
  id: number
  type: keyof object
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
}
