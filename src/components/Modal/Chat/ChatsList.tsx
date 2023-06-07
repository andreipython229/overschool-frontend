import { FC } from 'react'

import { ChatPreview } from './ChatPreview'
import { Chats } from 'types/chatsT'

import styles from './chat.module.scss'

type chatsListT = {
  chats?: Chats
}

export const ChatsList: FC<chatsListT> = ({ chats }) => {
  return (
    <div className={styles.chatsList}>
      {chats?.map(chat => (
        <ChatPreview key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
