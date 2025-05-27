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
import { useMediaQuery } from '@mui/material'

type chatPanelT = {
  chats?: Chats
}

export const ChatPanel: FC<chatPanelT> = ({ chats }) => {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(selectUser)
  const { userId } = useAppSelector(state => state.user)
  const { userProfile } = useAppSelector(state => state.userProfile)
  const { chatId } = useAppSelector(state => state.chat)
  const [chatSearch, setChatSearch] = useState<string>('')
  const mobile = useMediaQuery('(max-width: 1024px)')

  return mobile && chatId ? null : (
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
      </div>
      <ChatsList chats={chats} />
    </div>
  )
}
