export type ClassesSettingsPropsT = {
  showSettingsClassesModal: () => void
  modulesList: any
  lessonId: string
}

export interface ILesson {
  audio: null | File
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
