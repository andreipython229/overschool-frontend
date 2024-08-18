import { FC, useState, useEffect, ChangeEvent, useRef } from 'react'
import { RoleE } from 'enum/roleE'
import { ChatInput } from './ChatInput'
import { ChatUser } from './ChatUser'
import { ChatMessagesList } from './ChatMessagesList'
import { ChatGroupPreview } from './ChatGroupPreview'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useLazyFetchChatQuery } from 'api/chatsService'
import { ChatI, MessageI, Messages, SenderI } from 'types/chatsT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from './chat.module.scss'

import { useLazyFetchMessagesQuery } from '../../../api/chatsService'

import { w3cwebsocket, IMessageEvent } from 'websocket'
import { removeChat } from '../../../store/redux/chats/slice'
import { selectUser } from '../../../selectors'

export const ChatWorkspace: FC = () => {
  const { chatId } = useAppSelector(state => state.chat)
  const { userId } = useAppSelector(state => state.user)
  const { role } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [openGroupPreview, setOpenGroupPreview] = useState<boolean>(false)
  const [selectedChatData, setSelectedChatData] = useState<ChatI>()
  const [usersInGroup, setUsersInGroup] = useState<SenderI[]>()
  const [socket, setSocket] = useState<WebSocket>()
  const [messages, setMessages] = useState<Messages>([])
  const [message, setMessage] = useState<string>('')

  const [fetchChatData, { data, isFetching, isSuccess }] = useLazyFetchChatQuery()
  const [fetchMessages, { data: messagesData }] = useLazyFetchMessagesQuery()

  const messagesRef = useRef<HTMLDivElement | null>(null)
  const socketRef = useRef<w3cwebsocket | null>(null)

  useEffect(() => {
    if (chatId) {
      if (socketRef.current === null || socketRef.current?.readyState !== WebSocket.OPEN) {
        fetchMessages(chatId)
        fetchChatData(chatId)

        // socketRef.current = new w3cwebsocket(`ws://sandbox.coursehb.ru/ws/chats/${chatId}?user_id=${userId}`)
        socketRef.current = new w3cwebsocket(`wss://apidev.coursehb.ru/ws/chats/${chatId}?user_id=${userId}`)
        // socketRef.current = new w3cwebsocket(`ws://localhost:8000/ws/chats/${chatId}?user_id=${userId}`)
        socketRef.current.onopen = () => {
          console.log('WebSocket connected')
        }

        socketRef.current.onmessage = event => {
          if (typeof event.data === 'string') {
            const receivedMessage: MessageI = JSON.parse(event.data)
            setMessages(messages => [...messages, receivedMessage])
            // console.log('Received message:', receivedMessage);
          } else {
            // console.log('Received non-string data:', event.data);
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

  // useEffect(() => {
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     socket.onmessage = event => {
  //       const data = JSON.parse(event.data)
  //       console.log(data)
  //     }
  //   }
  // }, [socket])

  const handleSubmit = async () => {
    if (message.length > 0) {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const data = {
          message: message,
          sender: userId,
        }
        socketRef.current.send(JSON.stringify(data))
        setMessage('')
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
              <div className={styles.chatWorkspace_wrapper} ref={messagesRef}>
                <div className={styles.chatWorkspace_content}>
                  <ChatMessagesList messages={messages as Messages} chatData={selectedChatData as ChatI} />
                </div>
              </div>

              {data?.is_deleted === false ? (
                <>
                  {role === RoleE.Teacher ? (
                    <>
                      <ChatInput handleSubmit={handleSubmit} message={message} handleChangeMessage={handleChangeMessage} />
                    </>
                  ) : role === RoleE.Admin ? (
                    <>
                      <ChatInput handleSubmit={handleSubmit} message={message} handleChangeMessage={handleChangeMessage} />
                    </>
                  ) : role === RoleE.Student ? (
                    <>
                      {data?.type === 'PERSONAL' ? (
                        <ChatInput handleSubmit={handleSubmit} message={message} handleChangeMessage={handleChangeMessage} />
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}
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
