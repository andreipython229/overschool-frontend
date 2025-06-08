import React, { useState, useRef, useEffect, FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { ChatList } from 'components/ChatGPT/chatListModal/ChatList'
import {
  SendMessagePayload,
  useSendMessageMutation,
  useLazyFetchLatestMessagesQuery,
  useCreateChatMutation,
  useLazyFetchLatestChatsQuery,
  useDeleteChatMutation,
  useAssignChatOrderMutation,
  CreateChatPayload,
} from '../../api/chatgptService'
import OverAiIcon from '../../assets/img/common/newIconModal.svg'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ListMessagesIconPath } from 'assets/Icons/svgIconPath'
import { aiButtonNavIcon, messageNavIcon, userNavIcon, aiMobileButtonNavIcon } from './svg/svgIconPath'
import styles from './chatgpt.module.scss'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeRenderer } from 'utils/gptChatTextRenderer'
import { Modal } from 'components/common/Modal/Modal'

interface Chat {
  id: number
  order: number
}

type ChatGPTProps = {
  isOpen: boolean
  onClose: () => void
}

export const ChatGPT: FC<ChatGPTProps> = ({ isOpen, onClose }) => {
  const [messageInput, setMessageInput] = useState('')
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const [showChatListForm, setShowChatListForm] = useState(false)
  const [chatData, setChatData] = useState<{ [id: number]: { order: number; chat_name: string } }>({})
  const [selectedChatId, setCreatedChatId] = useState<number>()
  const [isChatSelected, setIsChatSelected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingChats, setIsFetchingChats] = useState(false)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [chatsLoaded, setChatsLoaded] = useState(false)
  const [isChatSelectionDisabled, setIsChatSelectionDisabled] = useState(false)
  const [isCreatingChatDisabled, setIsCreatingChatDisabled] = useState(false)
  const [isDeletingChatDisabled, setIsDeletingChatDisabled] = useState(false)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true)
  const [draggedChatId, setDraggedChatId] = useState<number | null>(null)
  const [draggedOverChatId, setDraggedOverChatId] = useState<number | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('RU')

  const [refetchChats, { data: latestChats }] = useLazyFetchLatestChatsQuery()
  const [refetchMessages, { data: latestMessages }] = useLazyFetchLatestMessagesQuery()
  const [createChatMutation] = useCreateChatMutation()
  const [sendMessage] = useSendMessageMutation()
  const [deleteChat] = useDeleteChatMutation()
  const [assignChatOrder] = useAssignChatOrderMutation()

  const [dots, setDots] = useState('.')
  const listOfChatContainerRef = useRef<HTMLDivElement | null>(null)
  const activeChatRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [bufUserQuestion, setBufUserQuestion] = useState('')

  const [userQuestions, setUserQuestions] = useState<Array<{ sender_question: string }>>([])
  const [botAnswers, setBotAnswers] = useState<Array<{ answer: string }>>([])

  useEffect(() => {
    if (latestMessages) {
      if (latestMessages[0] && Array.isArray(latestMessages[0])) {
        setUserQuestions(latestMessages[0])
      } else {
        setUserQuestions([])
      }

      if (latestMessages[1] && Array.isArray(latestMessages[1])) {
        setBotAnswers(latestMessages[1])
      } else {
        setBotAnswers([])
      }
    }
  }, [latestMessages])

  useEffect(() => {
    scrollMessagesToBottom()
  }, [isLoading, isLoadingMessages])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots === '...') return '.'
        return prevDots + '.'
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const savedChatId = Number(localStorage.getItem('selectedChatId'))
    if (savedChatId) {
      setCreatedChatId(savedChatId)
      selectChat(savedChatId)
    }
    setTextAreaFocus()
    scrollToSelectedChat()

    const fetchData = async () => {
      if (!isOpen) return

      setError(null)
      setWarning(null)
      setIsLoadingMessages(true)
      setIsFetchingChats(true)

      if (!chatsLoaded) {
        await fetchChats()
      }
      setIsFetchingChats(false)

      if (selectedChatId && refetchMessages && isChatSelected) {
        try {
          await refetchMessages({ overai_chat_id: selectedChatId })
          scrollMessagesToBottom()
        } catch (error) {
          setError('Ошибка получения сообщений')
        } finally {
          setIsLoadingMessages(false)
        }
      } else {
        setIsLoadingMessages(false)
      }
    }
    fetchData()
    console.log(Object.keys(chatData).length === 0, !isLoading, !isFetchingChats)
    setShowWelcomeMessage(Object.keys(chatData).length === 0 && !isLoading && !isFetchingChats && !isCreatingChatDisabled)
  }, [selectedChatId, refetchMessages, isChatSelected, chatsLoaded, showWelcomeMessage, isOpen, isFetchingChats])

  const setTextAreaFocus = () => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, 100)
  }

  const scrollToSelectedChat = () => {
    if (activeChatRef.current) {
      activeChatRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const scrollMessagesToBottom = () => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      handleSendMessage(messageInput)
  }

  const formatBotAnswer = (answer: string): JSX.Element => {
    const escapeHtml = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/####/g, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    }

    const codeBlockRegex = /```([\s\S]*?)```/g
    const formattedAnswer = answer.replace(codeBlockRegex, (_, code) => {
      return `<pre><code>${code.trim()}</code></pre>`
    })

    return <div dangerouslySetInnerHTML={{ __html: escapeHtml(formattedAnswer) }} />
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollMessagesToBottom()
    }, 100)

    return () => clearTimeout(timer)
  }, [latestMessages, isOpen, selectedChatId])

  const selectChat = async (chatId: number | undefined) => {
    if (!isChatSelectionDisabled) {
      let selectedChatId: number | undefined = chatId
      if (chatId === undefined || chatId === 1) {
        for (const [id, chat] of Object.entries(chatData)) {
          if (chat.order === 1) {
            selectedChatId = Number(id)
            break
          }
        }
      }

      if (selectedChatId !== undefined) {
        setCreatedChatId(selectedChatId)
        setIsChatSelected(true)
        setDraggedChatId(selectedChatId)
        localStorage.setItem('selectedChatId', selectedChatId.toString())
        try {
          await refetchMessages({ overai_chat_id: selectedChatId })
        } catch (error) {
          setError('Ошибка получения сообщений')
        }
      }
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, chatId: number) => {
    e.dataTransfer.setData('text/plain', '')
    setDraggedChatId(chatId)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, chatId: number) => {
    e.preventDefault()
    setDraggedOverChatId(chatId)
  }

  const handleDragEnd = async () => {
    if (draggedChatId !== null && draggedOverChatId !== null && draggedChatId !== draggedOverChatId) {
      const updatedChatDataCopy = JSON.parse(JSON.stringify(chatData))
      const dragOrder = updatedChatDataCopy[draggedChatId].order
      const dropOrder = updatedChatDataCopy[draggedOverChatId].order

      Object.keys(updatedChatDataCopy).forEach(chatIdStr => {
        const chatId = parseInt(chatIdStr, 10)
        const order = updatedChatDataCopy[chatId].order
        if (order > dragOrder && order <= dropOrder) {
          updatedChatDataCopy[chatId].order -= 1
        } else if (order < dragOrder && order >= dropOrder) {
          updatedChatDataCopy[chatId].order += 1
        }
      })

      updatedChatDataCopy[draggedChatId].order = dropOrder
      setChatData(updatedChatDataCopy)

      try {
        await assignChatOrder(updatedChatDataCopy)
      } catch (error) {
        console.error('Ошибка при обновлении порядка чатов на сервере:', error)
        setChatData(chatData)
      } finally {
        setDraggedChatId(null)
        setDraggedOverChatId(null)
      }
    }
  }

  const createChat = async () => {
    try {
      setCreatedChatId(undefined)
      setIsChatSelected(true)
      setIsCreatingChatDisabled(true)

      setUserQuestions([])
      setBotAnswers([])

      const convertToCreateChatPayload = (chatData: { [id: number]: { order: number; chat_name: string } }): CreateChatPayload => {
        const orderData = Object.entries(chatData).map(([id, { order }]) => ({ id: Number(id), order }))
        return { orderData }
      }

      const payload: CreateChatPayload = convertToCreateChatPayload(chatData)

      const response = await createChatMutation(payload)
      if ('data' in response && response.data !== undefined) {
        const newChatId = response.data.overai_chat_id
        localStorage.setItem('selectedChatId', newChatId.toString())
        await fetchChats()
        setCreatedChatId(newChatId)
        return response.data
      } else {
        setError('Ошибка при создании чата.')
        return null
      }
    } catch (error) {
      setError('Ошибка при создании чата.')
      return null
    } finally {
      setIsCreatingChatDisabled(false)
    }
  }

  const handleCreateChat = async () => {
    if (!isLoadingMessages) {
      setShowWelcomeMessage(false)
      await createChat()
      setShowWelcomeMessage(false)
    }
  }

  const fetchChats = async () => {
    try {
      if (refetchChats) {
        const response = await refetchChats()

        if (response.status === 'fulfilled' && response.isSuccess) {
          const receivedChatData = response.data
          setChatData(receivedChatData)
          setChatsLoaded(true)
        } else {
          setError('Ошибка при получении списка чатов.')
        }
      }
    } catch (error) {
      setError('Ошибка при получении списка чатов.')
    }
  }

  const handleDeleteChat = async (chatId: number) => {
    setIsDeletingChatDisabled(true)
    const previousChatData = { ...chatData }
    const isDeletingSelectedChat = chatId === selectedChatId

    if (isDeletingSelectedChat) {
      let minOrder = Infinity
      let firstChatId = selectedChatId
      for (const [id, chat] of Object.entries(chatData)) {
        if (Number(id) !== chatId && chat.order < minOrder) {
          minOrder = chat.order
          firstChatId = Number(id)
          localStorage.setItem('selectedChatId', firstChatId.toString())
          selectChat(firstChatId)
        }
      }
      if (Object.entries(chatData).length === 1) {
        setShowWelcomeMessage(true)
      }

      if (firstChatId) {
        setCreatedChatId(Number(firstChatId))
      } else {
        setCreatedChatId(undefined)
      }
    }

    const chatArray = Object.entries(chatData).map(([id, chat]) => ({
      id: Number(id),
      ...chat,
    }))

    const orderData = chatArray.map(chat => ({ id: chat.id, order: chat.order })).filter(chat => chat.id !== chatId)

    const updatedChatData = chatArray.filter(chat => chat.id !== chatId)
    const newChatData = Object.fromEntries(updatedChatData.map(chat => [chat.id, { order: chat.order, chat_name: chat.chat_name }]))

    setChatData(newChatData)

    try {
      await deleteChat({ chat_id: chatId, orderData })
      await fetchChats()
    } catch (error) {
      setChatData(previousChatData)
      setError('Ошибка при удалении чата.')
    } finally {
      setIsDeletingChatDisabled(false)
    }

    if (!isDeletingSelectedChat && selectedChatId) {
      setCreatedChatId(selectedChatId)
    }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value)
  }

  const handleSendMessage = async (messageInput: string) => {
    if (messageInput.trim() === '') return
    setBufUserQuestion(messageInput)
    scrollMessagesToBottom()
    try {
      setIsLoading(true)
      setIsChatSelectionDisabled(true)
      setIsCreatingChatDisabled(true)

      const payload: SendMessagePayload = {
        message: messageInput,
        overai_chat_id: selectedChatId === 1 ? (await createChat())?.overai_chat_id : selectedChatId!,
        language: selectedLanguage,
      }

      const botResponseTimeout = setTimeout(() => {
        setWarning('Генерация сообщения займет некоторое время...')
      }, 10000)

      await sendMessage(payload)

      if (refetchMessages) {
        await refetchMessages({ overai_chat_id: payload.overai_chat_id })
      }

      setMessageInput('')
      setError(null)
      setWarning(null)
      clearTimeout(botResponseTimeout)
    } catch (error: unknown) {
      setError('Ошибка при отправке сообщения.')
    } finally {
      setIsLoading(false)
      setIsChatSelectionDisabled(false)
      setIsCreatingChatDisabled(false)
    }
    setTextAreaFocus()
    setTimeout(() => {
      setError(null)
      setWarning(null)
    }, 3000)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ChatGPT"
      variant="gradient"
      width="800px"
    >
      <div className={styles.content}>
        <div className={styles.chatContainer}>
          {/* Chat messages will be rendered here */}
        </div>

        <form onSubmit={handleSubmit} className={styles.inputContainer}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Введите сообщение..."
            className={styles.input}
          />
          <Button type="submit" color="primary" text="Отправить" />
        </form>
    </div>
    </Modal>
  )
}

export default ChatGPT
