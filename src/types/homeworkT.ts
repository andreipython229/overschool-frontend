import {CheckHw} from "../Pages/StudentCourse/StudentLessonPreview/StudentHomeworkCheck";

export type homeworksStatsT = {
  count: number
  next: null
  previous: null
  results: homeworkStatT[]
}

export type homeworkStatT = {
  course_name: string
  group_id: number
  homework: number
  homework_name: string
  last_reply: string
  mark: null | number
  status: string
  user: number
  user_avatar: string
  user_email: string
  user_first_name: string
  user_last_name: string
  user_homework_id: number
}

export type CurrentUser = {
  name: string
  surname: string
  avatar: string
  text_files: FileT[]
  audio_files: FileT[]
  last_reply: string
  text: string
}

export interface UserHomework {
  user_homework_id: number
  created_at: string
  updated_at: string
  user: number
  homework: number
  homework_name: string
  last_reply: LastReply
  text: string
  status: string
  mark: number
  teacher: number
  teacher_first_name: string
  teacher_last_name: string
  teacher_avatar: string
  text_files: FileT[]
  audio_files: FileT[]
  user_homework_checks: UserHomeworkCheck[]
}

export interface LastReply {
  user_homework_check_id: number
  user_homework: number
  created_at: string
  updated_at: string
  text: string
  status: string
  teacher_message: any
  author: number
  author_first_name: string
  author_last_name: string
  profile_avatar: string
  text_files: FileT[]
  audio_files: FileT[]
}

export interface UserHomeworkCheck {
  user_homework_check_id: number
  user_homework: number
  created_at: string
  updated_at: string
  text: string
  status: string
  teacher_message: any
  author: number
  author_first_name: string
  author_last_name: string
  profile_avatar: string
  text_files: FileT[]
  audio_files: FileT[]
}

export interface Homework {
  homework_id: number
  section: number
  name: string
  order: number
  author_id: number
  description: string
  video: string
  automate_accept: boolean
  time_accept: string
  points: number
  text_files: FileT[]
  audio_files: FileT[]
  type: string
  user_mark: number
  user_homework_checks: CheckHw[]
  all_components: any[]
}

type FileT = {
  id: number
  file: string
  file_url: string
  author: number
  base_lesson: number
  user_homework: number
  user_homework_check: number
}
