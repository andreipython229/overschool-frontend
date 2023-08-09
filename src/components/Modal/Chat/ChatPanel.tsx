import { FC, useEffect, useState } from 'react'

import { ChatsList } from './ChatsList'
import { Chats, SenderI } from 'types/chatsT'
import { useAppSelector } from 'store/hooks'

import styles from './chat.module.scss'

type chatPanelT = {
  chats?: Chats
}

export const ChatPanel: FC<chatPanelT> = ({ chats }) => {
  const [currentUserData, setCurrentUserData] = useState<SenderI>()

  const { userId } = useAppSelector(state => state.user)

  useEffect(() => {
    if (chats) {
      const currentUser = chats[0]?.senders.find(sender => sender.id === userId)
      setCurrentUserData(currentUser)
    }
  }, [chats])

  return (
    <div className={styles.chatPanel}>
      <div className={styles.chatPanel_top}>
        <div className={styles.chatPanel_user}>
          <div className={styles.chatPanel_user_avatar}>
            {currentUserData?.avatar ? (
              <img src={`${currentUserData.avatar}`} alt="avatar" />
            ) : (
              `${currentUserData?.first_name[0] || 'Б'}${currentUserData?.last_name[0] || 'И'}`
            )}
          </div>
          <p>
            {currentUserData?.first_name || 'Без'} {currentUserData?.last_name || 'Имени'}
          </p>
        </div>
      </div>
      <ChatsList chats={chats} />
    </div>
  )
}
