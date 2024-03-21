export type appealsStatT = {
  count: number
  next: null
  previous: null
  results: appealStatT[]
}

export type appealStatT = {
  name: string
  email: string
  phone: string
  message: string
  is_read: boolean
  course: number
  course_name: string
  created_at: string
  updated_at: string
  id: number
}
