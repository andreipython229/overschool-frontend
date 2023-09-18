import { FC, memo, useEffect, useState } from 'react'

import { ChatI, MessageI, SenderI } from 'types/chatsT'
import { useAppSelector } from 'store/hooks'

import styles from './chat.module.scss'
import { format } from 'date-fns'

type chatMessageT = {
  chatData: ChatI
  message: MessageI
}

export const ChatMessage: FC<chatMessageT> = memo(({ chatData, message }) => {
  const { userId } = useAppSelector(state => state.user)
  const [userInfo, setUserInfo] = useState<SenderI>()

  useEffect(() => {
    chatData && setUserInfo(chatData.senders.find(sender => sender.id === message.sender))
  }, [chatData])

  const isAuthor = userId === message.sender

  return (
    <div className={`${styles.chatMessage} ${isAuthor ? styles.chatMessage_right : styles.chatMessage_left}`}>
      <div className={isAuthor ? styles.chatMessage_content_right : styles.chatMessage_content_left}>
        <div className={styles.chatMessage_avatar}>
          {userInfo?.avatar ? (
            <img src={`${userInfo.avatar}`} alt="avatar" />
          ) : (
            `${userInfo?.first_name[0] || 'б'}${userInfo?.last_name || 'и'}`
          )}
        </div>
        <div className={isAuthor ? styles.chatMessage_mess_right : styles.chatMessage_mess_left}>
          {!isAuthor && <p className={styles.chatMessage_user_name}>{`${userInfo?.first_name} ${userInfo?.last_name}` || 'Без имени'}</p>}
          <div className={styles.chatMessage_textWrapper}>
            <p>{message?.content}</p>
            <div className={styles.chatMessage_text_time}>{message?.sent_at ? format(new Date(message?.sent_at || ''), 'HH:mm') : format(new Date(), 'HH:mm')}</div>
          </div>
        </div>
      </div>
    </div>
  )
})
