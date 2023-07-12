export type CoursesDataT = {
  course_id: number
  created_at: Date
  updated_at?: Date
  published?: boolean
  order?: number | string | Blob
  name: string
  format?: string
  duration_days?: number
  price?: string
  description: string
  photo?: string
  photo_url?: string
  author_id: number
  public: string
  school: number
}

export type CoursesT = {
  next?: null
  previous?: null
  count?: 0
  results: CoursesDataT[]
}

export interface checkCoursesDataT extends CoursesDataT {
  checked: boolean
}
