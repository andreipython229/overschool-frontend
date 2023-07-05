import { FC, useState, useEffect } from 'react'
import io from 'socket.io-client'

import { ChatInput } from './ChatInput'
import { ChatUser } from './ChatUser'
import { ChatMessagesList } from './ChatMessagesList'
import { ChatGroupPreview } from './ChatGroupPreview'
import { useAppSelector } from 'store/hooks'
import { useLazyFetchChatQuery } from 'api/chatsService'
import { ChatI, Messages, SenderI } from 'types/chatsT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from './chat.module.scss'

export const ChatWorkspace: FC = () => {
  const { chatId } = useAppSelector(state => state.chat)
  const { userId } = useAppSelector(state => state.user)

  const [openGroupPreview, setOpenGroupPreview] = useState<boolean>(false)
  const [selectedChatData, setSelectedChatData] = useState<ChatI>()
  const [usersInGroup, setUsersInGroup] = useState<SenderI[]>()

  const [fetchChatData, { data, isFetching, isSuccess }] = useLazyFetchChatQuery()
  // const [fetchMessages, { data: messages }] = useLazyFetchMessagesQuery()

  useEffect(() => {
    if (chatId) {
      fetchChatData(chatId)

      // const socket = io('/api/socket.io', {
      //   path: `/api/School_1/chats/${chatId}/messages`,
      // })

      // const ws = new WebSocket('ws://dev.api.overschool.by:8000/')

      // ws?.onopen(e => {
      //   console.log('connected')
      // })

      // socket.on('connect', () => {
      //   console.log('connected')
      // })

      // fetchMessages(chatId)
    }

    // return () => {
    //   socket.on('disconnect', () => {
    //     console.log('disconnected')
    //   })
    // }
  }, [chatId])

  useEffect(() => {
    if (isSuccess && data) {
      setSelectedChatData(data)
      setUsersInGroup(data?.senders.filter(sender => sender.id !== userId))
    }
  }, [isSuccess])

  return (
    <div className={styles.chatWorkspace}>
      {isFetching && (
        <div className={styles.chat_loader}>
          <SimpleLoader style={{ width: '30px', height: '30px' }} />
        </div>
      )}
      {openGroupPreview ? (
        <ChatGroupPreview closeGroup={setOpenGroupPreview} usersList={usersInGroup as SenderI[]} chatData={selectedChatData as ChatI} />
      ) : (
        <>
          {chatId ? (
            <>
              <ChatUser openGroup={setOpenGroupPreview} chatData={selectedChatData as ChatI} usersCount={usersInGroup?.length as number} />
              <div className={styles.chatWorkspace_wrapper}>
                <div className={styles.chatWorkspace_content}>
                  {/* <ChatMessagesList messages={messages as Messages} chatData={selectedChatData as ChatI} /> */}
                </div>
              </div>
              <ChatInput />
            </>
          ) : (
            <div className={styles.chatWorkspace_preview}>
              <p>Выберите чат, чтобы начать общение</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
