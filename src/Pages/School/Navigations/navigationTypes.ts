export type ClassesSettingsPropsT = {
  showSettingsClassesModal: () => void
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
  setModalTypeClasses: () => void
  setLessonIdAndType: (arg: object) => void
}

export type LessonAddBlockPropsT = {
  setModalTypeClasses: () => void
  toggleModalModule: () => void
  setLessonIdAndType: (arg: object) => void
  modulesList: modulesListT[]
}

export type LessonsBlockT = {
  lessonsName: string
  id: number
  order: number
  type: keyof object
  setLessonIdAndType: (arg: object) => void
}
