import { textFile, audioFile } from './filesT'
import { LESSON_TYPE } from 'enum/lessonTypeE'

export interface ILesson {
  lesson_id: number
  section: number
  name: string
  order: number
  description: string
  video: string
  points: number
  text_files: textFile[]
  audio_files: audioFile[]
  type: LESSON_TYPE.LESSON
}

export interface IHomework {
  homework_id: number
  section: number
  name: string
  order: number
  author_id: string
  description: string
  automate_accept: boolean
  time_accept: string
  points: number
  text_files: textFile[]
  audio_files: audioFile[]
  type: LESSON_TYPE.HOMEWORK
}

export interface ITest {
  test_id: number
  section: number
  name: string
  success_percent: number
  random_questions: boolean
  random_answers: boolean
  show_right_answers: boolean
  attempt_limit: boolean
  attempt_count: number
  points_per_answer: number
  points: number
  order: number
  author_id: string
  type: LESSON_TYPE.TEST
}

export type commonLessonT = | ILesson | IHomework | ITest

export type lessonT = {
  id: number
  name: string
  order: number
  type: string
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
