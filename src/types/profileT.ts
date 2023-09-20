enum sex {
  MAN = 'М',
  WOMEN = 'Ж',
}

export type profileT = {
  avatar: string
  avatar_url: string
  city: string
  description: string
  profile_id: number
  sex: sex
  user: profileUserT
}

export type profileUserT = {
  last_name: string
  first_name: string
  phone_number?: string
  email?: string
  username?: string
}

export type changePasswordProfileT = {
  new_password: string
  email?: string

}
