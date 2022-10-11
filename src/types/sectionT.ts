export type lessonT = {
  id: number
  name: string
  order: number
  type: string
}

export interface ILesson {
  audio: null | File
  audio_url: string
  author_id: number
  code: null | string
  created_at: string
  description: string
  file: null | File
  lesson_id: number
  name: string
  order: null | number
  published: boolean
  section: number
  updated_at: string
  video: string
}

export type sectionT = {
  section_name: string
  section: number
  lessons: lessonT[]
}

export type sectionsT = {
  course_id: number
  course_name: string
  sections: sectionT[]
}

export type studentAccardioT = {
  modules: sectionsT
}
