import { HomeWork } from 'Pages/HomeWork/HomeWork'
import { IFile } from './filesT'
import { LESSON_TYPE } from 'enum/lessonTypeE'

export interface ILesson {
  lesson_id: number
  baselesson_ptr_id?: number
  section: number
  name: string
  order: number
  description: string
  video: string
  points: number
  text_files: IFile[]
  audio_files: IFile[]
  type: LESSON_TYPE.LESSON
  active: boolean
}

export interface IHomework {
  homework_id: number
  baselesson_ptr_id?: number
  section: number
  name: string
  order: number
  author_id: string
  description: string
  automate_accept: boolean
  time_accept: string
  points: number
  text_files: IFile[]
  audio_files: IFile[]
  type: LESSON_TYPE.HOMEWORK
  active: boolean
}

export interface ITest {
  test_id: number
  baselesson_ptr_id?: number
  section: number
  name: string
  questions: any
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
  active: boolean
}

export type commonLessonT = ILesson | IHomework | ITest

export type lessonT = {
  id: number
  name: string
  order: number
  type: string
  baselesson_ptr_id?: number
  viewed: boolean
  completed: boolean
}

export type sectionT = {
  section_name: string
  section: number
  baselesson_ptr_id?: number
  lessons: lessonT[]
}

export type sectionsT = {
  course_id: number
  course_name: string
  baselesson_ptr_id?: number
  sections: sectionT[]
}

export type studentAccardioT = {
  modules: sectionsT
}

export type answerT = {
  question: any
  answer: any
  id: string
  name: string
  title: string
}
