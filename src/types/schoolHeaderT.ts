export type schoolHeaderResT = {
  school_id: number
  created_at?: Date
  updated_at?: Date
  name: string
  description: string
  photo_logo: string
  photo_background: string
}

export type schoolHeaderReqT = {
  name: string 
  description: string
  photo_logo: string
  photo_background: string
}
