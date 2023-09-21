export type Chats = ChatI[]
export type Messages = MessageI[]

export interface ChatI {
  id: string
  name: string
  is_deleted: boolean
  created_at: string
  senders: SenderI[]
  last_message: MessageI
  unread_count: number
}

export interface SenderI {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  avatar?: string
}

export interface MessageI {
  id: number
  sender: number
  sent_at: string
  content: string
}
