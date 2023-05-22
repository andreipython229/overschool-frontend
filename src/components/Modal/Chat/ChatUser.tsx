import { FC } from 'react'

import styles from './chat.module.scss'

export const ChatUser: FC = () => {
  return (
    <div className={styles.chatUser}>
      <div>
        <div className={styles.chatUser_info}>
          <div className={styles.chatUser_avatar}>ба</div>
          <div>
            <div className={styles.chatUser_nameWrapper}>
              <p className={styles.chatUser_name}>Коховец Алла</p>
            </div>
            <p className={styles.chatUser_lastVisit}>Был(а) онлайн 20.05.2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}
