export type Chats = ChatI[]
export type Messages = MessageI[]


export interface UserChatsInformI {
  total_unread: number
  chats: ChatI[]
}
export interface UserInformI {
  message: UserChatsInformI
  type: string
}

export interface UserInformAppealsI {
  type: string
  school_id: number
  unread_count: number
}



export interface ChatI {
  id: string
  name: string
  is_deleted: boolean
  created_at: string
  senders: SenderI[]
  last_message: MessageI
  unread: number
  type: string
}

export interface SenderI {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  avatar?: string
  user_role: string
}

export interface MessageI {
  id: number
  sender: number
  sent_at: string
  content: string
}

export interface PersonalChatI {
  teacher_id: number
  student_id: number
  message: string
  type: string
}

export interface PersonalChatForAdminOrTeacherI {
  student_id: number
}
