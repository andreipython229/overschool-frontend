export type studentsGroupT = {
  next?: null
  previous?: null
  count?: number
  results: studentsGroupsT[]
}

export type studentsGroupsT = {
  group_id?: number
  created_at?: Date
  updated_at?: Date
  name: string
  course_id?: number
  teacher_id?: number
  students: number[]
}

export type studentsTableHeader = {
  admin: number
  student_table_id: number
  students_table_info: studentGroupInfoT[]
}

export type studentGroupInfoT = {
  order: number
  name: string
  checked: boolean
  label?: string
  id: number
}
