import { FC, memo } from 'react'
import { RoleE } from 'enum/roleE'
import { ChatI } from 'types/chatsT'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { emailSvgIconPath } from 'config/commonSvgIconsPath'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectChat, removeChat } from 'store/redux/chats/slice'
import styles from './chat.module.scss'
import Badge from '@mui/material/Badge'
import { selectUser } from '../../../selectors'
import { chatGroup, chatCourse } from '../../../assets/img/common/'

type chatPreviewT = {
  chat: ChatI
}

export const ChatPreview: FC<chatPreviewT> = memo(({ chat }) => {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(selectUser)
  const { chatId } = useAppSelector(state => state.chat)
  const { userId } = useAppSelector(state => state.user)

  const isSelected = chatId === chat.id

  function formatTimeOrDate(sentAt: Date) {
    const sentDate = new Date(sentAt)
    const currentDate = new Date()

    if (
      sentDate.getDate() === currentDate.getDate() &&
      sentDate.getMonth() === currentDate.getMonth() &&
      sentDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Если дата сообщения совпадает с текущей датой, выводим время
      const hours = sentDate.getHours().toString().padStart(2, '0')
      const minutes = sentDate.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    } else {
      // Иначе выводим дату
      const day = sentDate.getDate().toString().padStart(2, '0')
      const month = (sentDate.getMonth() + 1).toString().padStart(2, '0')
      const year = sentDate.getFullYear().toString().slice(-2)
      return `${day}.${month}.${year}`
    }
  }

  const getInterlocutor = (chat: ChatI) => {
    const sender1 = chat.senders.filter(sender => sender.id !== userId)
    return sender1[0]
  }

  const getRoleTranslation = (role: string): string => {
    switch (role) {
      case 'Teacher':
        return 'Специалист техподдержки'
      case 'Student':
        return 'Пользователь'
      case 'Admin':
        return 'Администратор'
      default:
        return 'Без роли'
    }
  }

  return (
    <div
      className={`${chat.type === 'PERSONAL' ? styles.chatPreviewSupport : styles.chatPreview} ${isSelected ? styles.chatPreview_selected : ''}`}
      onClick={() => {
        if (chatId !== chat.id) {
          dispatch(selectChat(chat.id))
        } else {
          dispatch(selectChat(''))
        }
      }}
    >
      {chat.type === 'GROUP' ? (
        <div className={styles.chatPreview_avatarWrap}>
          {role === RoleE.Student ? (
            <img className={styles.chatPreview_avatarWrap_avatar} alt="Информационный канал" src={chatGroup} />
          ) : (
            <img className={styles.chatPreview_avatarWrap_avatar} alt="Информационный канал" src={chatGroup} />
          )}
        </div>
      ) : chat.type === 'PERSONAL' ? (
        <div className={styles.chatPreview_avatarWrap}>
          <img src={`${getInterlocutor(chat)?.avatar || ''}`} className={styles.chatPreview_avatarWrap_avatar}>
            {/* <SchoolIcon /> */}
          </img>
        </div>
      ) : chat.type === 'COURSE' ? (
        <div className={styles.chatPreview_avatarWrap}>
          {role === RoleE.Student ? (
            <img className={styles.chatPreview_avatarWrap_avatar} alt="Информационный канал" src={chatCourse} />
          ) : (
            <img className={styles.chatPreview_avatarWrap_avatar} alt="Информационный канал" src={chatCourse} />
          )}
        </div>
      ) : null}

      {/* ----------- СЕРЕДИНА ---------------*/}

      {/*{chat.type === "GROUP" ? (*/}
      {/*    <div className={styles.chatPanel_user_avatar_userName_status}>{headerUserRoleName[role]}</div>*/}
      {/*) : null}*/}
      {chat.type === 'GROUP' ? (
        <div className={styles.chatPreview_info}>
          <div className={styles.chatPanel_user_avatar_userName_status}>Информационный канал</div>
          <div className={styles.chatPreview_top}>
            <p>{chat.name || 'Канал без имени'}</p>
          </div>
          <div className={styles.chatPreview_lastMessage}>{chat?.last_message?.content || ''}</div>
        </div>
      ) : chat.type === 'PERSONAL' ? (
        <div className={styles.chatPreview_info}>
          <div className={styles.chatPanel_user_avatar_userName_statusSupport}>Чат с поддержкой</div>
          {/* <div className={styles.chatPanel_user_avatar_userName_status}>
              {`Специалист техподдержки ${getRoleTranslation(getInterlocutor(chat).user_role || '')}`}
            </div> */}
          <div className={styles.chatPreview_top}>
            <p>{/* {getInterlocutor(chat).first_name || 'Канал без имени'} {getInterlocutor(chat).last_name || ''} */}</p>
          </div>
          <div className={styles.chatPreview_lastMessageSupport}>{chat?.last_message?.content || ''}</div>
        </div>
      ) : chat.type === 'COURSE' ? (
        <div className={styles.schoolChat}>
          {/* Содержимое для COURSE чата */}
          <div className={styles.chatPreview_info}>
            <div className={styles.chatPanel_user_avatar_userName_status}>Информационный канал</div>
            <div className={styles.chatPreview_top}>
              <p>{chat.name || 'Канал без имени'}</p>
            </div>
            <div className={styles.chatPreview_lastMessage}>{chat?.last_message?.content || ''}</div>
          </div>
        </div>
      ) : (
        <div className={styles.chatPreview_info}></div>
      )}

      {/* ----------------------------------- */}

      {/* ----ПРАВЫЙ КРАЙ ДАТА и БЕЙДЖИК {chat?.last_message && formatTimeOrDate(chat?.last_message?.sent_at)}-----*/}
      <div className={styles.chatPreview_newMessage}>
        {/*<p className={styles.chatPreview_time}>{chat?.last_message && formatTime(new Date(chat?.last_message?.sent_at))}</p>*/}
        <p className={styles.chatPreview_time}>{chat?.last_message?.sent_at ? formatTimeOrDate(new Date(chat?.last_message?.sent_at)) : ''}</p>
        {Number(chat?.unread) > 0 ? <div className={styles.chatPreview_badge}>{chat?.unread || 0}</div> : <></>}
      </div>
      {/*  -----------------------------------*/}
    </div>
  )
})
