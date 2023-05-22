import { FC } from 'react'

import { ChatPanel } from './ChatPanel'
import { ChatWorkspace } from './ChatWorkspace'

import styles from './chat.module.scss'

export const Chat: FC = () => {
  return (
    <div className={styles.chat}>
      <ChatPanel />
      <ChatWorkspace />
    </div>
  )
}
