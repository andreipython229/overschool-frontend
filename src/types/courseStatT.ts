export type courseStatT = {
  count: number
  next?: number
  previous?: number
  results: result[]
}

export type result = {
  course_id: number
  email: string
  student_name: string
  student: number
  group: number
  last_active: Date
  update_date: Date
  ending_date: Date
  mark_sum: number
  average_mark?: number
  progress?: number
}

export type courseStatsT = {
  course_id: number
  public: string
  name: string
  format: string
  duration_days: number
  price: string
  description: string
  photo: string
  order: number
  photo_url: string
}
