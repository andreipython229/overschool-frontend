import { FC, useState, useEffect, ChangeEvent } from 'react'

import { ChatInput } from './ChatInput'
import { ChatUser } from './ChatUser'
import { ChatMessagesList } from './ChatMessagesList'
import { ChatGroupPreview } from './ChatGroupPreview'
import { useAppSelector } from 'store/hooks'
import { useLazyFetchChatQuery } from 'api/chatsService'
import { ChatI, Messages, SenderI } from 'types/chatsT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from './chat.module.scss'

import { useLazyFetchMessagesQuery } from '../../../api/chatsService'

export const ChatWorkspace: FC = () => {
  const { chatId } = useAppSelector(state => state.chat)
  const { userId } = useAppSelector(state => state.user)

  const [openGroupPreview, setOpenGroupPreview] = useState<boolean>(false)
  const [selectedChatData, setSelectedChatData] = useState<ChatI>()
  const [usersInGroup, setUsersInGroup] = useState<SenderI[]>()
  const [socket, setSocket] = useState<WebSocket>()
  const [messages, setMessages] = useState<any[]>()
  const [message, setMessage] = useState<string>('')

  const [fetchChatData, { data, isFetching, isSuccess }] = useLazyFetchChatQuery()
  const [fetchMessages, { data: messagesData}] = useLazyFetchMessagesQuery()

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId)
      fetchChatData(chatId)

      // const socket = new WebSocket(`ws://apidev.overschool.by:8000/ws/chats/${chatId}/`)
      // const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chats/${chatId}/`)
      const socket = new WebSocket(`ws://45.135.234.137:8000/ws/chats/${chatId}/`)
      setSocket(socket)

      socket.onopen = () => console.log('WebSocket connected')
      socket.onmessage = event => {
        const recievedMessages = JSON.parse(event.data)

        // setMessages(recievedMessages)

        console.log("resievedMessages = ", recievedMessages)
      }

      socket.onerror = event => {
        console.log("socket error = ", event)
      }

      socket.onclose = event => {
        console.log(event)
      }

      console.log(socket)
    }

    return () => {
      socket?.close()
    }
  }, [chatId])


  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
      console.log(messagesData)
    }
  }, [messagesData]);


  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.onmessage = event => {
        const data = JSON.parse(event.data)
        console.log(data)
      }
    }
  }, [socket])

  const handleSubmit = async () => {

    console.log("Socket readyState = ", socket?.readyState)
    console.log("handleSubmit")
    if (socket && socket.readyState === WebSocket.OPEN) {
      const data = {
        message: message,
        sender: userId,
      }
      console.log('sent')
      socket.send(JSON.stringify(data))
      console.log("send data", data)
      setMessage('')
    }
  }

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  useEffect(() => {
    if (data) {
      setSelectedChatData(data)
      setUsersInGroup(data?.senders.filter(sender => sender.id !== userId))
    }
  }, [data])

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
                   <ChatMessagesList messages={messages as Messages} chatData={selectedChatData as ChatI} />
                </div>
              </div>
              <ChatInput handleSubmit={handleSubmit} message={message} handleChangeMessage={handleChangeMessage} />
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
