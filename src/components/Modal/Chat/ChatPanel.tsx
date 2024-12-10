import { FC, useEffect, useState } from 'react'

import { ChatsList } from './ChatsList'
import { Chats, SenderI } from 'types/chatsT'
import { useAppSelector, useAppDispatch } from 'store/hooks'

import styles from './chat.module.scss'
import { removeChat } from '../../../store/redux/chats/slice'
import { headerUserRoleName } from '../../../config'
import { selectUser } from '../../../selectors'
import { Button } from '../../../components/common/Button/Button'
import { Input } from 'components/common/Input/Input/Input'

type chatPanelT = {
  chats?: Chats
}

export const ChatPanel: FC<chatPanelT> = ({ chats }) => {
  // const [currentUserData, setCurrentUserData] = useState<SenderI>()
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(selectUser)
  const { userId } = useAppSelector(state => state.user)
  const { userProfile } = useAppSelector(state => state.userProfile)
  const { chatId } = useAppSelector(state => state.chat)
  const [chatSearch, setChatSearch] = useState<string>('')
  //
  // useEffect(() => {
  //   if (chats) {
  //     // const currentUser = chats[0]?.senders.find(sender => sender.id === userId)
  //     setCurrentUserData(undefined)
  //   }
  // }, [chats])

  const [isHidden, setIsHidden] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const closeChatList = () => {
    if (screenWidth < 1025) {
      setIsHidden(!isHidden)
      setIsVisible(!isVisible)
    }
  }

  const screenWidth = window.screen.width

  // useEffect(() => {
  //     return () => {
  //       if (chatId) {
  //           dispatch(removeChat());
  //       }
  //     }
  // }, [])

  // useEffect(() => {
  //     console.log("chat list chatId = ", chatId)
  // }, [chatId]);
  //
  // useEffect(() => {
  //     console.log("chat panel = ", chats)
  // }, [chats]);

  return (
    <div className={styles.chatPanel}>
      <div className={styles.chatPanel_top}>
        <Input
          name="chat-search"
          value={chatSearch}
          className={styles.searchInput}
          onChange={e => setChatSearch(e.target.value)}
          type="search"
          placeholder="Поиск..."
        />
        {/* <div className={styles.chatPanel_user}>
          <div className={styles.chatPanel_user_avatar}>
            {userProfile?.avatar ? (
              <img src={`${userProfile.avatar}`} alt="avatar" />
            ) : (
              `${userProfile?.first_name[0] || 'Б'}${userProfile?.last_name[0] || 'И'}`
            )}
          </div>
          <div>
            <div className={styles.chatPanel_user_avatar_userName_status}>{headerUserRoleName[role]}</div>
            <p>{!userProfile?.first_name && !userProfile?.last_name ? 'Без Имени' : `${userProfile?.last_name} ${userProfile?.first_name}`}</p>
          </div>
        </div> */}
      </div>
      {isVisible && <Button onClick={closeChatList} className={styles.chatPanel_top_btn} text={'назад'} variant={'primary'}></Button>}
      {isHidden && <ChatsList chats={chats} />}
    </div>
  )
}
