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
  token: string
  username: null | string
}
