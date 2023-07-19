import { ReactNode } from 'react'

export interface GenerateRow {
  [key: string]: string | number | { name: string; avatar: string } | { text: string; image: ReactNode }
}
