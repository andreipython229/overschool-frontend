import { sectionT } from '../types/sectionT'

export type CoursesDataT = {
  course_id: string
  created_at: Date
  updated_at?: Date
  published?: boolean
  order?: number
  name: string
  format?: string
  duration_days?: number
  price?: string
  description: string
  photo?: string
  photo_url?: string
  author_id: number
  public: string
}

export type CoursesT = {
  next?: null
  previous?: null
  count?: 0
  results: CoursesDataT[]
  // sections?: sectionT[]
}
