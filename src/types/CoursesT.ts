import { ReactNode } from 'react'

export type CoursesDataT = {
  contact_link: string
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
  is_catalog: boolean
  is_direct: boolean
  baselessons_count?: number
  limit?: number
  remaining_period?: number
  folder: {
    id: number
    name: string
  }
}

export type StGroupT = {
  group_id: number
  name: string
  teacher_id?: number
  type: string
}

export type CourseWithGroupsT = {
  course_id: number
  order?: number | string | Blob
  name: string
  format?: string
  duration_days?: number
  price?: string
  description: string
  photo?: string
  photo_url?: string
  public: string
  school: number
  student_groups: StGroupT[]
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

export interface checkCourseT extends CourseWithGroupsT {
  selected_group: number | null
}
