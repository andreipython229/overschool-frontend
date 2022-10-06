export type userInitialT = {
  email: string
  first_name: string
  last_name: string
}

export type UserT = {
  auth: boolean
  permission: number
}

export type CreateUserT = {
  email?: string | undefined
  oferta: boolean
  password: string
  phone?: string | undefined
  politics: boolean
}
