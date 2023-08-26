import {FC, useState, useEffect, ChangeEvent, useRef} from 'react'

import { ChatInput } from './ChatInput'
import { ChatUser } from './ChatUser'
import { ChatMessagesList } from './ChatMessagesList'
import { ChatGroupPreview } from './ChatGroupPreview'
import {useAppDispatch, useAppSelector} from 'store/hooks'
import { useLazyFetchChatQuery } from 'api/chatsService'
import { ChatI, MessageI, Messages, SenderI} from 'types/chatsT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from './chat.module.scss'

import { useLazyFetchMessagesQuery } from '../../../api/chatsService'

import { w3cwebsocket, IMessageEvent } from 'websocket';

export const ChatWorkspace: FC = () => {
  const { chatId } = useAppSelector(state => state.chat)
  const { userId } = useAppSelector(state => state.user)

  const [openGroupPreview, setOpenGroupPreview] = useState<boolean>(false)
  const [selectedChatData, setSelectedChatData] = useState<ChatI>()
  const [usersInGroup, setUsersInGroup] = useState<SenderI[]>()
  const [socket, setSocket] = useState<WebSocket>()
  const [messages, setMessages] = useState<Messages>([])
  const [message, setMessage] = useState<string>('')

  const [fetchChatData, { data, isFetching, isSuccess }] = useLazyFetchChatQuery()
  const [fetchMessages, { data: messagesData}] = useLazyFetchMessagesQuery()

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<w3cwebsocket | null>(null);


  useEffect(() => {
    // if (socketRef.current) {
    //   socketRef.current?.close()
    // }

    if (chatId) {
      if (socketRef.current === null || socketRef.current?.readyState !== WebSocket.OPEN) {
        fetchMessages(chatId)
        fetchChatData(chatId)

        // const socket = new WebSocket(`ws://apidev.overschool.by:8000/ws/chats/${chatId}/`)
        socketRef.current = new w3cwebsocket(`ws://127.0.0.1:8000/ws/chats/${chatId}/`)
        // const newSocket = new WebSocket(`ws://45.135.234.137:8000/ws/chats/${chatId}/`)
        // setSocket(newSocket)

        socketRef.current.onopen = () => {
          console.log('WebSocket connected')
        }

        socketRef.current.onmessage = event => {
          // const recievedMessage: MessageI = JSON.parse(event.data)
          // setMessages(messages => [...messages, recievedMessage]);

          if (typeof event.data === 'string') {
            const receivedMessage: MessageI = JSON.parse(event.data);
            setMessages(messages => [...messages, receivedMessage]);
            console.log('Received message:', receivedMessage);
          } else {
            console.log('Received non-string data:', event.data);
          }
        }
        socketRef.current.onerror = event => {
          console.log("socket error = ", event)
        }

        socketRef.current.onclose = event => {
          console.log(event)
        }
      }
    }

    return () => {
      console.log('close modal')
      if (socketRef.current) {
        socketRef.current.close();
      }
    }
  }, [chatId])


  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
      console.log(messagesData)
    }
  }, [messagesData]);


  // useEffect(() => {
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     socket.onmessage = event => {
  //       const data = JSON.parse(event.data)
  //       console.log(data)
  //     }
  //   }
  // }, [socket])

  const handleSubmit = async () => {

    console.log("Socket readyState = ", socketRef.current?.readyState)
    console.log("handleSubmit")
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const data = {
        message: message,
        sender: userId,
      }
      console.log('sent')
      socketRef.current.send(JSON.stringify(data))
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

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

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
