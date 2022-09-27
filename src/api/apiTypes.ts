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
  email: string
  access_token: string
  refresh_token: string
  username: null | string
}
