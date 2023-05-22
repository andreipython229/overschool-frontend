import { FC } from 'react'

import { ChatInput } from './ChatInput'
import { ChatUser } from './ChatUser'
import { ChatMessage } from './ChatMessage'

import styles from './chat.module.scss'

export const ChatWorkspace: FC = () => {
  return (
    <div className={styles.chatWorkspace}>
      {/* <div className={styles.chatWorkspace_preview}>
        <p>Выберите чат, чтобы начать общение</p>
      </div> */}
      <ChatUser />
      <div className={styles.chatWorkspace_wrapper}>
        <div className={styles.chatWorkspace_content}>
          <ChatMessage />
        </div>
      </div>
      <ChatInput />
    </div>
  )
}
