export type schoolHeaderResT = {
  school_id: number
  created_at?: Date
  updated_at?: Date
  name: string
  description: string
  logo_header: string
  photo_background: string
  photo_background_url: string
  logo_header_url: string
  logo_school: string
  logo_school_url: string
  favicon: string
  favicon_url: string
}

export type schoolHeaderReqT = {
  name: string
  description: string
  logo_header: string
  photo_background: string
  favicon?: string | null
  logo_school?: string | null
  school?: string
}

export type schoolT = {
  name: string
  offer_url: string
  tariff?: string
  contact_link: string
  test_course: boolean
  vk_link?: string
  youtube_link?: string
  twitter_link?: string
  instagram_link?: string
  extra_link?: string
  telegram_link?: string
}
