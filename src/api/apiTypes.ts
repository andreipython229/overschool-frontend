import { CoursesDataT } from "types/CoursesT"
import { Section } from "types/courseStatT"

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