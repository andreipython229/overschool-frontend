import { FC, useEffect, useState } from 'react'

import { ChatPreview } from './ChatPreview'
import { Chats } from 'types/chatsT'

import styles from './chat.module.scss'

type chatsListT = {
  chats?: Chats
}

export const ChatsList: FC<chatsListT> = ({ chats }) => {
  const [sortedChats, setSortedChats] = useState(chats)

  useEffect(() => {
    if (chats) {
      const chatsWithLastMessage = chats?.filter(chat => chat.last_message !== null)
      const chatsWithoutLastMessage = chats?.filter(chat => chat.last_message === null)

      // Сортируем чаты с последним сообщением по времени
      const sortedChatsWithLastMessage = chatsWithLastMessage?.sort((a, b) => {
        const dateA = new Date(a.last_message.sent_at).getTime()
        const dateB = new Date(b.last_message.sent_at).getTime()
        return dateB - dateA
      })

      // Объединяем чаты, сначала идут чаты с последним сообщением, затем без него
      const mergedChats = sortedChatsWithLastMessage?.concat(chatsWithoutLastMessage ?? [])
      setSortedChats(mergedChats)
    }
  }, [chats])

  return (
    <div className={styles.chatsList}>
      {/*<div>Chat count = {sortedChats?.length}</div>*/}
      {sortedChats?.map(chat => (
        <div className={styles.chatPreviewWrapper} key={chat.id}>
          <ChatPreview chat={chat} />
        </div>
      ))}
    </div>
  )
}
