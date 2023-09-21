import { FC, memo, useEffect } from 'react'

import { ChatI } from 'types/chatsT'
import { formatTime } from 'utils/convertDateToUnits'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import {chatsGroup, emailSvgIconPath, updateDataIcon} from 'config/commonSvgIconsPath'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectChat, removeChat } from 'store/redux/chats/slice'

import styles from './chat.module.scss'

import Badge from '@mui/material/Badge';

type chatPreviewT = {
  chat: ChatI
}

export const ChatPreview: FC<chatPreviewT> = memo(({ chat }) => {
  const dispatch = useAppDispatch()
  const { chatId } = useAppSelector(state => state.chat)

  const isSelected = chatId === chat.id

  return (
    <div
      className={`${styles.chatPreview} ${isSelected ? styles.chatPreview_selected : ''}`}
      onClick={() => {
        dispatch(selectChat(chat.id))
      }}
    >
      <div className={styles.chatPreview_avatarWrap}>
         {/*<img className={styles.chatPreview_avatar} src='' alt="avatar" />*/}
        <IconSvg width={30} height={30} viewBoxSize="0 0 24 24" path={chatsGroup} />
      </div>
      <div className={styles.chatPreview_info}>
        <div className={styles.chatPreview_top}>
          <p>{chat.name || 'Группа без имени'}</p>
        </div>
        <div className={styles.chatPreview_lastMessage}>{chat?.last_message?.content || ''}</div>
      </div>
      <div className={styles.chatPreview_newMessage}>
        <p className={styles.chatPreview_time}>{chat?.last_message && formatTime(new Date(chat?.last_message?.sent_at))}</p>
        {Number(chat?.unread_count) > 0 ? (
            <div className={styles.chatPreview_badge}>
              <Badge badgeContent={chat?.unread_count || 0} color="error">
                <IconSvg width={22} height={22} viewBoxSize="0 0 24 24" path={emailSvgIconPath} />
              </ Badge>
            </div>
        ) : (<></>)}
      </div>
    </div>
  )
})
