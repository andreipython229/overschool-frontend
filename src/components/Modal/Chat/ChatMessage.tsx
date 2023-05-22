import { FC } from 'react'

import styles from './chat.module.scss'

export const ChatMessage: FC = () => {
  return (
    <div className={`${styles.chatMessage} ${styles.chatMessage_right}`}>
      <div className={styles.chatMessage_content_right}>
        <div className={styles.chatMessage_mess_right}>
          <div className={styles.chatMessage_textWrapper}>
            <p>спасибо, наверно надо было в домашнем задании отправлять...</p>
            <div className={styles.chatMessage_text_time}>12:05</div>
          </div>
        </div>
      </div>
    </div>
  )
}
