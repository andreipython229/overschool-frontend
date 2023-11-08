export interface IFile {
  id: number
  order: number
  description: string
  file: string
  file_url: string
  author: number
  base_lesson: number
  user_homework: number
  created_at: Date
  updated_at: Date
  size: number
}
