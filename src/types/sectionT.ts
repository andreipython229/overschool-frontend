import { HomeWork } from 'Pages/HomeWork/HomeWork'
import { IFile } from './filesT'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import { useState } from 'react'
import { extend } from 'lodash'

export interface IBlockDesc {
  id: number
  description: string
  type: string
  order: number
}

export interface IBlockMath {
  id: number
  formula: string
  type: string
  order: number
}

export interface IBlockVid {
  id: number
  video?: string
  url?: string
  type: string
  order: number
}

export interface IBlockCode {
  id: number
  code: string
  type: string
  order: number
  language?: string
}

export interface IBlockPic {
  id: number
  picture: File | Blob
  picture_url: string
  type: string
  order: number
}

export interface IBlockButtons {
  id: number
  buttons: IButton[]
  type: string
  order: number
}

export interface IButton {
  id: number
  block: number
  name: string
  link: string
  color: string
}

export type BlockButtonT = {
  block: number
  name: string
  link: string
  color: string
}

export type BlockT = IBlockCode | IBlockDesc | IBlockPic | IBlockVid | IBlockMath | IBlockButtons

export interface ILesson {
  lesson_id: number
  baselesson_ptr_id: number
  section: number
  name: string
  order: number
  blocks: BlockT[]
  description: string
  video: string
  points: number
  text_files: IFile[]
  audio_files: IFile[]
  type: LESSON_TYPE.LESSON
  active: boolean
  url: string
  show_right_answers: boolean
}

export interface IHomework {
  homework_id: number
  baselesson_ptr_id: number
  section: number
  name: string
  blocks: BlockT[]
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
  video: string
  user_homework_checks: []
  url: string
  show_right_answers: boolean
}

export interface ITest {
  test_id: number
  baselesson_ptr_id: number
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
  video: string
  url: string
  random_test_generator: boolean
  num_questions: number
}

export type commonLessonT = ILesson | IHomework | ITest

export type TestT = ITest
export interface checkedTestT extends TestT {
  checked: boolean
}

export type lessonT = {
  id: number
  name: string
  order: number
  type: string
  baselesson_ptr_id: number
  viewed: boolean
  completed: boolean
  active: boolean
}

export type sectionT = {
  group_settings: any
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
  teacher_id: number | any
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
  picture?: string
}
