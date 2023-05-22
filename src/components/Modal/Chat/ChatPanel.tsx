import { FC } from 'react'

import { ChatsList } from './ChatsList'

import styles from './chat.module.scss'

export const ChatPanel: FC = () => {
  return (
    <div className={styles.chatPanel}>
      <div className={styles.chatPanel_top}>
        <div className={styles.chatPanel_user}>
          <p>Админ Админович</p>
        </div>
      </div>
      <ChatsList />
    </div>
  )
}
