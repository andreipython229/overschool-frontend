import { FC, useEffect, useState } from 'react'

import { ChatsList } from './ChatsList'
import { Chats, SenderI } from 'types/chatsT'
import { useAppSelector, useAppDispatch } from 'store/hooks'

import styles from './chat.module.scss'
import {removeChat} from "../../../store/redux/chats/slice";
import {headerUserRoleName} from "../../../config";
import {selectUser} from "../../../selectors";

type chatPanelT = {
  chats?: Chats
}

export const ChatPanel: FC<chatPanelT> = ({ chats }) => {
  // const [currentUserData, setCurrentUserData] = useState<SenderI>()
    const dispatch = useAppDispatch()
    const {role} = useAppSelector(selectUser)
  const { userId } = useAppSelector(state => state.user)
  const { userProfile} = useAppSelector((state) => state.userProfile)
    const { chatId } = useAppSelector(state => state.chat)
  //
  // useEffect(() => {
  //   if (chats) {
  //     // const currentUser = chats[0]?.senders.find(sender => sender.id === userId)
  //     setCurrentUserData(undefined)
  //   }
  // }, [chats])

  
    const [isHidden, setIsHidden] = useState(true);
    const closeChatList = () => {
      if (screenWidth < 1025) {
        setIsHidden(!isHidden)
      }
    }
    
    const screenWidth = window.screen.width


    useEffect(() => {
        return () => {
          if (chatId) {
              dispatch(removeChat());
          }
        }
    }, [])

  return (
     
    
      <div className={styles.chatPanel} onClick={closeChatList}>
        <div className={styles.chatPanel_top}>
          <div className={styles.chatPanel_user}>
            <div className={styles.chatPanel_user_avatar}>
                {userProfile?.avatar ? (
                <img src={`${userProfile.avatar}`} alt="avatar" />
              ) : (
                `${userProfile?.first_name[0] || 'Б'}${userProfile?.last_name[0] || 'И'}`
              )}
            </div>
              <div>
                  {/*style={{color: '#BA75FF'}}*/}
                  <div className={styles.chatPanel_user_avatar_userName_status}>{headerUserRoleName[role]}</div>
                  <p>{userProfile?.first_name || 'Без'} {userProfile?.last_name || 'Имени'}</p>
              </div>
          </div>
        </div>
        { isHidden && 
        <ChatsList chats={chats}/>
        }
        
      </div>
    
    
    )
            
}
