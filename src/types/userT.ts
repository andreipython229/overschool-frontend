export type UserT = {
  auth: boolean
  role: number
}
export type AuthDateT = {
  authDate: string | number
  userId: number
  userName: string
}

export interface ILoginUserInfo {
  id: number
  date_joined: Date
  email: string
  first_name: string
  groups: number[]
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login: Date
  last_name: string
  patronymic: string
  phone_number: string
  username: string
  user_permissions: number[]
}

export type EmployeeT = {
    username?: string
    id?: number
    role: string
    email: string
    first_name?: string
    last_name?: string
    avatar?: string
}
export interface UserProfileT {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  avatar: string
}

export interface ITariff {
  tariff_name: string
  days_left: number | null
  staff: number | null
  students: number | null
  number_of_courses: number | null
  tariff: number | null

}

