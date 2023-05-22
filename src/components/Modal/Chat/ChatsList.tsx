import { FC } from 'react'

import { ChatPreview } from './ChatPreview'

import styles from './chat.module.scss'

export const ChatsList: FC = () => {
  return (
    <div className={styles.chatsList}>
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
    </div>
  )
}
