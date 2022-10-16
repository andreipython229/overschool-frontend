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
  access_token: string
  refresh_token: string
  user: {
    pk: number
    username: string
    email: string
    groups: number[]
  }
}
