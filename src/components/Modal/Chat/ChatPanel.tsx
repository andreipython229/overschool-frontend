import { FC, useEffect, useState } from 'react'

import { ChatsList } from './ChatsList'
import { Chats, SenderI } from 'types/chatsT'
import { useAppSelector, useAppDispatch } from 'store/hooks'

import styles from './chat.module.scss'
import {removeChat} from "../../../store/redux/chats/slice";

type chatPanelT = {
  chats?: Chats
}

export const ChatPanel: FC<chatPanelT> = ({ chats }) => {
  // const [currentUserData, setCurrentUserData] = useState<SenderI>()
    const dispatch = useAppDispatch()
  // const { userId } = useAppSelector(state => state.user)
  const { userProfile} = useAppSelector((state) => state.userProfile)
    const { chatId } = useAppSelector(state => state.chat)
  //
  // useEffect(() => {
  //   if (chats) {
  //     // const currentUser = chats[0]?.senders.find(sender => sender.id === userId)
  //     setCurrentUserData(undefined)
  //   }
  // }, [chats])

    useEffect(() => {
        return () => {
          console.log('close chat panel')

          if (chatId) {
              dispatch(removeChat());
          }
        }
    }, [])

  return (
    <div className={styles.chatPanel}>
      <div className={styles.chatPanel_top}>
        <div className={styles.chatPanel_user}>
          <div className={styles.chatPanel_user_avatar}>
            {userProfile?.avatar ? (
              <img src={`${userProfile.avatar}`} alt="avatar" />
            ) : (
              `${userProfile?.first_name[0] || 'Б'}${userProfile?.last_name[0] || 'И'}`
            )}
          </div>
          <p>
            {userProfile?.first_name || 'Без'} {userProfile?.last_name || 'Имени'}
          </p>
        </div>
      </div>
      <ChatsList chats={chats} />
    </div>
  )
}
