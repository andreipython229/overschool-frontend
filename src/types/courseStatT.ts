import { homeworkStatT } from './homeworkT'

export type studentsTableStatsT = {
  count: number
  next: null
  previous: null
  results: result[]
}

export type studentsTableInfoT = result[]

export type result = {
  group_id: number
  course_id: number
  student_id: number
  avatar: string
  id: number
  courses_avatar: string
  username: string
  first_name: string
  last_name: string
  email: string
  course_name: string
  course_updated_at: string
  group_name: string
  last_active: string
  last_login: string
  mark_sum: number
  average_mark: number
  sections: Section[]
  date_removed: string
  is_deleted: boolean
  date_added: Date
  progress: number
  unique_students_count: number
  chat_uuid: string
  access: boolean
  access_period: string
}

export interface Section {
  section_id: number
  course: number
  name: string
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  lesson_id: number
  section: number
  name: string
  order: number
  author_id: number
  description: string
  video: string
  points: number
  type: string
  all_components: any[]
  active: boolean
  lessonChecked?: boolean
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

export type bannerStatInfoT = {
  banner_id: number
  total_clicks: number
  unique_clicks: number
  startDate: string
  endDate: string
 click_details: ClickDetail[]
}

export type ClickDetail = {
  timestamp: string
  user__email: string
}