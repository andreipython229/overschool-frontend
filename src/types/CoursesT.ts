export type CoursesT = {
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
}
