import { FC } from 'react'

import { ChatI, Messages, MessageI } from 'types/chatsT'
import { ChatMessage } from './ChatMessage'
import styles from './chat.module.scss'

type chatMessagesT = {
  messages: Messages
  chatData: ChatI
}

export const ChatMessagesList: FC<chatMessagesT> = ({ messages, chatData }) => {
  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = a.sent_at ? new Date(a.sent_at).getTime() : new Date().getTime()
    const dateB = b.sent_at ? new Date(b.sent_at).getTime() : new Date().getTime()
    return dateA - dateB
  })

  const renderMessagesWithDateSeparators = () => {
    let currentDate = ''

    return sortedMessages.map((message: MessageI) => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }
      const messageDate = message?.sent_at
        ? new Date(message.sent_at).toLocaleDateString('ru-RU', options)
        : new Date().toLocaleDateString('ru-RU', options)

      if (messageDate !== currentDate) {
        currentDate = messageDate

        return (
          <div key={message.id}>
            <div className={styles.chatMessageSeparator}>{messageDate}</div>
            <ChatMessage key={message.id} chatData={chatData} message={message} />
          </div>
        )
      }

      return <ChatMessage key={message.id} chatData={chatData} message={message} />
    })
  }

  return <>{renderMessagesWithDateSeparators()}</>
}
