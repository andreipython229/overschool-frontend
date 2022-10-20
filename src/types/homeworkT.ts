export type homeworksStatsT = {
  count: number
  next: null
  previous: null
  results: homeworkStatT[]
}

export type homeworkStatT = {
  avatar: string
  email: string
  homework_name: string
  homework_pk?: number
  last_update: string
  lesson_name?: string
  mark: null
  status: string
  user_homework: number
  course_name: string
  user_name: string
  user_lastname: string
}
