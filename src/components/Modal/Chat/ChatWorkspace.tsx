import { FC, useState, useEffect, ChangeEvent, useRef } from 'react'
import { RoleE } from 'enum/roleE'
import { ChatInput } from './ChatInput'
import { ChatUser } from './ChatUser'
import { ChatMessagesList } from './ChatMessagesList'
import { ChatGroupPreview } from './ChatGroupPreview'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useLazyFetchChatQuery } from 'api/chatsService'
import { ChatI, MessageI, Messages, SenderI } from 'types/chatsT'
import { NewLoader, SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from './chat.module.scss'

import { useLazyFetchMessagesQuery } from '../../../api/chatsService'

import { w3cwebsocket } from 'websocket'
import { selectUser } from '../../../selectors'

export const ChatWorkspace: FC = () => {
  const { chatId } = useAppSelector(state => state.chat)
  const { userId } = useAppSelector(state => state.user)
  const { role } = useAppSelector(selectUser)
  const [openGroupPreview, setOpenGroupPreview] = useState<boolean>(false)
  const [selectedChatData, setSelectedChatData] = useState<ChatI>()
  const [usersInGroup, setUsersInGroup] = useState<SenderI[]>()
  const [messages, setMessages] = useState<Messages>([])
  const [message, setMessage] = useState<string>('')
  const [files, setFiles] = useState<string[]>([])

  const [fetchChatData, { data, isFetching }] = useLazyFetchChatQuery()
  const [fetchMessages, { data: messagesData }] = useLazyFetchMessagesQuery()

  const messagesRef = useRef<HTMLDivElement | null>(null)
  const socketRef = useRef<w3cwebsocket | null>(null)

  useEffect(() => {
    if (chatId) {
      if (socketRef.current === null || socketRef.current?.readyState !== WebSocket.OPEN) {
        fetchMessages(chatId)
        fetchChatData(chatId)

        socketRef.current = new w3cwebsocket(
          process.env.REACT_APP_RUN_MODE === 'PRODUCTION'
            ? `wss://apidev.coursehb.ru/ws/chats/${chatId}?user_id=${userId}`
            : `ws://sandbox.coursehb.ru/ws/chats/${chatId}?user_id=${userId}`,
        )
        socketRef.current.onopen = () => {
          console.log('WebSocket connected')
        }

        socketRef.current.onmessage = event => {
          if (typeof event.data === 'string') {
            const receivedMessage: MessageI = JSON.parse(event.data)
            setMessages(messages => [...messages, receivedMessage])
          }
        }
        socketRef.current.onerror = event => {
          console.log('socket error = ', event)
        }

        socketRef.current.onclose = event => {
          console.log(event)
        }
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [chatId])

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData)
    }
  }, [messagesData])

  const handleSubmit = async () => {
    if (message.length > 0 || files.length > 0) {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const data = {
          message: message,
          sender: userId,
          file:
            files.length > 0
              ? {
                  filename: `image-${userId}-base64.jpg`,
                  type: files[0].split(';')[0].split('data:')[1],
                  content: files[0].split('base64,')[1],
                }
              : null,
        }

        socketRef.current.send(JSON.stringify(data))
        setMessage('')
        setFiles([])
      }
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

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className={styles.chatWorkspace}>
      {isFetching && (
        <div className={styles.chat_loader}>
          <NewLoader />
        </div>
      )}
      {openGroupPreview ? (
        <ChatGroupPreview closeGroup={setOpenGroupPreview} usersList={usersInGroup as SenderI[]} chatData={selectedChatData as ChatI} />
      ) : (
        <>
          {chatId ? (
            <>
              <ChatUser openGroup={setOpenGroupPreview} chatData={selectedChatData as ChatI} usersCount={usersInGroup?.length as number} />
              <div className={styles.chatWorkspace_wrapper} ref={messagesRef}>
                <div className={styles.chatWorkspace_content}>
                  <ChatMessagesList messages={messages as Messages} chatData={selectedChatData as ChatI} />
                </div>
              </div>

              {data?.is_deleted === false ? (
                <>
                  {role === RoleE.Teacher ? (
                    <>
                      <ChatInput
                        handleSubmit={handleSubmit}
                        files={files}
                        setFiles={setFiles}
                        message={message}
                        handleChangeMessage={handleChangeMessage}
                      />
                    </>
                  ) : role === RoleE.Admin ? (
                    <>
                      <ChatInput
                        handleSubmit={handleSubmit}
                        files={files}
                        setFiles={setFiles}
                        message={message}
                        handleChangeMessage={handleChangeMessage}
                      />
                    </>
                  ) : role === RoleE.Student ? (
                    <>
                      {data?.type === 'PERSONAL' ? (
                        <ChatInput
                          handleSubmit={handleSubmit}
                          files={files}
                          setFiles={setFiles}
                          message={message}
                          handleChangeMessage={handleChangeMessage}
                        />
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          ) : (
            <div className={styles.chatWorkspace_preview}>
              <p>Выберите чат для общения</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
