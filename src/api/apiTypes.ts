import { CoursesDataT } from 'types/CoursesT'
import { Section } from 'types/courseStatT'

export interface UpdateCourses {
  formdata: FormData
  id: string | number
}

export interface ICredentials {
  phone?: string
  email?: string
  password: string
}

export interface IResponse {
  access: string
  refresh: string
  user: {
    id: number
    pk: number
    username: string
    email: string
    groups: number[]
  }
}

export interface IAllUsers {
  username: string
  email?: string
  id: number[]
  data: []
}

export interface IForgotPassword {
  email: string
}

export type CatalogResponseT = {
  count: number
  next: string
  previous: string
  results: {
    course_id: number
    description: string
    duration_days: number
    format: string
    is_catalog: boolean
    name: string
    photo: string
    photo_url: string
    price: number
    public: string
    school: number
  }[]
}

export type CatalogCourseT = CoursesDataT & {
  sections: Section[]
}

export type NewsletterTemplate = {
  schoolName: string
  template_name: string
  text: string
  delay_days: number
}

export interface IBanner {
  clicks_to_accept: number
  id: number
  clicks_count: string
  unique_clicks_count: string
  is_accepted_by_user: boolean
  title: string
  description: string
  is_active: boolean
  link: string
  school: number
  groups: number[]
}

export interface IBox {
  box_id: number
  box_name: string
  box_icon: string
  unopened_count: number
  opened_count: number
  remaining_to_guarantee: number | null
}

export interface IPrize {
  id: number
  name: string
  icon: string
  school: number
  drop_chance: number
  guaranteed_box_count: number
  is_active: boolean
}

export interface IPrizeBox {
  prize: IPrize
}

export interface ISchoolBoxes {
  id: number
  name: string
  icon: string
  school: number
  price: string
  quantity: number
  bonus_quantity: number
  is_active: boolean
  auto_deactivation_time: string
  prizes: IPrizeBox[]
}

export interface ISchoolBoxesCreate {
  name: string
  price: string
  quantity: number
  bonus_quantity?: number
  is_active?: boolean
  auto_deactivation_time?: string
}

export interface IOpenBox {
  message: string
  prize: IPrize
}

export interface ISchoolPrizeWinner {
  is_used: boolean
  prize: IPrize
  received_at: string
  user_email: string
}

export interface IInviteProgramResp {
  id: number
  is_active: boolean
  link: string
  school: number
  groups: number[]
}

export interface IInviteProgramReq {
  schoolName: string
  id: number
  data: FormData
}

export interface ISchoolTeachers {
  id: number
  name: string
  email: string
}
