import { FC, memo, useEffect} from 'react'

import { ChatI } from 'types/chatsT'
import { formatTime } from 'utils/convertDateToUnits'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import {chatsGroup, emailSvgIconPath, groupChatListIconPath, updateDataIcon} from 'config/commonSvgIconsPath'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectChat, removeChat } from 'store/redux/chats/slice'

import styles from './chat.module.scss';
import Badge from '@mui/material/Badge';

import {headerUserRoleName} from "../../../config";
import {selectUser} from "../../../selectors";

type chatPreviewT = {
  chat: ChatI
}

export const ChatPreview: FC<chatPreviewT> = memo(({ chat }) => {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(selectUser)
  const { chatId } = useAppSelector(state => state.chat)

  const isSelected = chatId === chat.id

  function formatTimeOrDate(sentAt: Date) {
      const sentDate = new Date(sentAt);
      const currentDate = new Date();

      if (
        sentDate.getDate() === currentDate.getDate() &&
        sentDate.getMonth() === currentDate.getMonth() &&
        sentDate.getFullYear() === currentDate.getFullYear()
      ) {
        // Если дата сообщения совпадает с текущей датой, выводим время
        const hours = sentDate.getHours().toString().padStart(2, '0');
        const minutes = sentDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      } else {
        // Иначе выводим дату
        const day = sentDate.getDate().toString().padStart(2, '0');
        const month = (sentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = sentDate.getFullYear().toString().slice(-2);
        return `${day}.${month}.${year}`;
      }
  }


  return (
    <div
      className={`${styles.chatPreview} ${isSelected ? styles.chatPreview_selected : ''}`}
      onClick={() => {
        dispatch(selectChat(chat.id))
      }}
    >
      <div className={styles.chatPreview_avatarWrap}>
         {/*<img className={styles.chatPreview_avatar} src='' alt="avatar" />*/}
        {/*<IconSvg width={30} height={30} viewBoxSize="0 0 24 24" path={chatsGroup} />*/}
        <Badge badgeContent={10} color="default">
         <IconSvg width={30} height={30} viewBoxSize="0 0 40 40" path={groupChatListIconPath} />
        </Badge>
      </div>

      {/* ----------- СЕРЕДИНА ---------------*/}
      <div className={styles.chatPreview_info}>

        <div className={styles.chatPanel_user_avatar_userName_status}>{headerUserRoleName[role]}</div>



        <div className={styles.chatPreview_top}>

          <p>{chat.name || 'Группа без имени'}</p>

        </div>


        <div className={styles.chatPreview_lastMessage}>{chat?.last_message?.content || ''}</div>
      </div>
      {/* ----------------------------------- */}


      {/* ----ПРАВЫЙ УРАЙ ДАТА и БЕЙДЖИК {chat?.last_message && formatTimeOrDate(chat?.last_message?.sent_at)}-----*/}
      <div className={styles.chatPreview_newMessage}>
        {/*<p className={styles.chatPreview_time}>{chat?.last_message && formatTime(new Date(chat?.last_message?.sent_at))}</p>*/}
        <p className={styles.chatPreview_time}>{chat?.last_message && formatTimeOrDate(new Date(chat?.last_message?.sent_at))}</p>
        {Number(chat?.unread_count) > 0 ? (
            <div className={styles.chatPreview_badge}>
              <Badge badgeContent={chat?.unread_count || 0} color="error">
                <IconSvg width={22} height={22} viewBoxSize="0 0 24 24" path={emailSvgIconPath} />
              </ Badge>
            </div>
        ) : (<></>)}
      </div>
      {/*  -----------------------------------*/}
    </div>
  )
})
