import { FC } from 'react'

import { ChatI, Messages } from 'types/chatsT'
import { ChatMessage } from './ChatMessage'

type chatMessagesT = {
  messages: Messages
  chatData: ChatI
}

export const ChatMessagesList: FC<chatMessagesT> = ({ messages, chatData }) => {
  return (
    <>
      {messages?.map(message => (
        <ChatMessage key={message.id} chatData={chatData} message={message}/>
      ))}
    </>
  )
}
