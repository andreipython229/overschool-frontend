import React, { useState, useRef, useEffect } from 'react'
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
import { log } from 'console'

interface Chat {
  id: number
  order: number
}

interface ChatGPTProps {
  isDialogOpen: boolean; 
  setIsDialogOpen: (isDialogOpen: boolean) => void; 
}

const ChatGPT: React.FC<ChatGPTProps> = ({ isDialogOpen, setIsDialogOpen }) => {
  const [messageInput, setMessageInput] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [showChatListForm, setShowChatListForm] = useState(false);
  const [chatData, setChatData] = useState<{ [id: number]: { order: number; chat_name: string } }>({});
  const [selectedChatId, setCreatedChatId] = useState<number>();
  const [isChatSelected, setIsChatSelected] = useState(false);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [isNewChat, setIsNewChat] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingChats, setIsFetchingChats] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  const [isChatSelectionDisabled, setIsChatSelectionDisabled] = useState(false);
  const [isCreatingChatDisabled, setIsCreatingChatDisabled] = useState(false);
  const [isDeletingChatDisabled, setIsDeletingChatDisabled] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);
  const [draggedChatId, setDraggedChatId] = useState<number | null>(null);
  const [draggedOverChatId, setDraggedOverChatId] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('RU');

  const [refetchChats, { data: latestChats }] = useLazyFetchLatestChatsQuery()
  const [refetchMessages, { data: latestMessages }] = useLazyFetchLatestMessagesQuery()
  // const [fetchWelcomeMessage, { data: welcomeMessageData }] = useLazyFetchWelcomeMessageQuery();

  // const [updateWelcomeMessage] = useUpdateWelcomeMessageMutation();
  const [createChatMutation] = useCreateChatMutation()
  const [sendMessage] = useSendMessageMutation()
  const [deleteChat] = useDeleteChatMutation()
  const [assignChatOrder] = useAssignChatOrderMutation()

  // const [userQuestions, setUserQuestions] = latestMessages && latestMessages[0] && Array.isArray(latestMessages[0]) ? latestMessages[0] : [];
  // const [botAnswers, setBotAnswers] = latestMessages && latestMessages[1] && Array.isArray(latestMessages[1]) ? latestMessages[1] : [];

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
    // console.log(userQuestions);

  }, [latestMessages]);



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
    const savedChatId = Number(localStorage.getItem('selectedChatId'));
    if (savedChatId) {
      setCreatedChatId(savedChatId);
      selectChat(savedChatId);
    }
    setTextAreaFocus()
    scrollToSelectedChat()

    const fetchData = async () => {
      if (!isDialogOpen) return;

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
    };
    fetchData();
    console.log(Object.keys(chatData).length === 0, !isLoading, !isFetchingChats);
    setShowWelcomeMessage(Object.keys(chatData).length === 0 && !isLoading && !isFetchingChats && !isCreatingChatDisabled);
  }, [selectedChatId, refetchMessages, isChatSelected, chatsLoaded, showWelcomeMessage, isDialogOpen, isFetchingChats]);

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

  const toggleDialog = async () => {
    setIsDialogOpen(!isDialogOpen)
    scrollMessagesToBottom()
    setTextAreaFocus()
    // isDialogOpen ? openChatModal() : closeChatModal()

    // const response = await fetchWelcomeMessage();
    // if (response.data) {
    // setShowWelcomeMessage(response.data.show_welcome_message);
    // }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false)
      // closeChatModal()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(messageInput)
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      setMessageInput(prev => prev + '\n')
    }
  }

  const handleShowChatMobileList = () => {
    setShowChatListForm(!showChatListForm)
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
  }, [latestMessages, isDialogOpen, selectedChatId])

  const selectChat = async (chatId: number | undefined) => {
    // setShowWelcomeMessage(false)
    if (!isChatSelectionDisabled) {

      let selectedChatId: number | undefined = chatId;
      // setIsNewChat(false);
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
      setIsChatSelected(true);
      setIsCreatingChatDisabled(true);
      // setIsNewChat(true);

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
      // setIsNewChat(true);
      setShowWelcomeMessage(false);
      await createChat();
      setShowWelcomeMessage(false);
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
    const previousChatData = { ...chatData }; // Сохраняем копию состояния
    const isDeletingSelectedChat = chatId === selectedChatId;

    if (isDeletingSelectedChat) {
      let minOrder = Infinity
      let firstChatId = selectedChatId
      for (const [id, chat] of Object.entries(chatData)) {
        if (Number(id) !== chatId && chat.order < minOrder) {
          minOrder = chat.order;
          firstChatId = Number(id);
          // setIsNewChat(false);
          localStorage.setItem('selectedChatId', firstChatId.toString());
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
    }
    finally {
      setIsDeletingChatDisabled(false)
    }

    // setCreatedChatId(undefined);
    if (!isDeletingSelectedChat && selectedChatId) {
      setCreatedChatId(selectedChatId)
    }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value)
  }

  const handleSendMessage = async (messageInput: string) => {
    if (messageInput.trim() === '') return
    // setIsNewChat(false);
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
    <div className="fixed-button">
      <button className={styles.chatGptButton} onClick={toggleDialog}>
        <img className={`${isDialogOpen && styles.chatGptButton_Pushed}`} src={OverAiIcon} alt="OverAI Icon" />
      </button>
      {
        <div className={`${styles.modalOverlay} ${isDialogOpen && styles.modalOverlay_open}`} onClick={handleOverlayClick}>
          <div className={`${styles.dialog} ${isDialogOpen && styles.dialogOpen} ${showWelcomeMessage && styles.noGradient}`}>
            {/* <button className={styles.chatgpt_close} onClick={toggleDialog}>
              <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
            </button> */}
            <div className={`${styles.contentContainer}`}>
              <div className={`${styles.topPane} ${isDialogOpen && styles.paneOpen}`}>
                <div className={styles.overAiText}>
                  <div onClick={handleShowChatMobileList} className={styles.ai_mobile_open_dialog_list}>
                    <IconSvg path={ListMessagesIconPath} width={30} height={30} viewBoxSize="0 0 30 30"></IconSvg>
                  </div>
                  <p>OVER AI</p>
                  <div className={styles.ai_mobile_close_btn_wrapper} onClick={() => setIsDialogOpen(false)}>
                    <div className={styles.ai_mobile_close_btn}></div>
                  </div>
                </div>
                {isFetchingChats ? (
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    <span>Получение чатов...</span>
                  </div>
                ) : (
                  <>
                    <div className={`${styles.listOfChatSection} ${showWelcomeMessage ? styles.listOfChatSectionDisabled : ''}`}>
                      <button className={`${styles.createChatButtonModal} ${isCreatingChatDisabled || showWelcomeMessage ? styles.createChatButtonModalDisabled : ''}`} onClick={handleCreateChat} disabled={isCreatingChatDisabled}>
                        <b>+</b>
                      </button>
                      <div className={styles.listOfChatContainer} ref={listOfChatContainerRef}>
                        {Object.entries(chatData)
                          .sort(([, a], [, b]) => a.order - b.order)
                          .map(([chatId, chatValue]) => {
                            const isActive = selectedChatId === Number(chatId)
                            return (
                              <div
                                key={chatId}
                                draggable
                                onDragStart={e => handleDragStart(e, Number(chatId))}
                                onDragOver={e => handleDragOver(e, Number(chatId))}
                                onDragEnd={handleDragEnd}
                                className={` ${styles.chatListItemWrapper}`}
                              >
                                <div
                                  onClick={() => {
                                    selectChat(Number(chatId))
                                  }}
                                  ref={isActive ? activeChatRef : null}
                                  className={`${draggedOverChatId === Number(chatId) ? styles.draggedOver : ''} ${styles.chatListItem} ${
                                    selectedChatId === Number(chatId) ? styles.activeChat : ''
                                  }`}
                                  style={{ borderRadius: '20px' }}
                                >
                                  <div className={styles.chatListItem_Circle}></div>
                                  <span className={styles.centeredText}>
                                    {`${chatValue.chat_name.length > 25 ? chatValue.chat_name.substring(0, 25) + '...' : chatValue.chat_name}`}
                                  </span>
                                </div>
                                <button className={`${styles.deleteChatBtn} ${isDeletingChatDisabled ? styles.deleteChatBtnDisabled : ''}`} onClick={(e) => {
                                  // e.stopPropagation(); // Предотвращаем всплытие события
                                  handleDeleteChat(Number(chatId));
                                }}>
                                  <div className={styles.close_cross}></div>
                                </button>
                              </div>
                            )
                          })}
                      </div>
                      {/* <button className={styles.chatMessageHistoryButton}>
                        <IconSvg path={arrowUpNavIcon} viewBoxSize='0 0 17 17' width={14} height={14} />
                      </button> */}
                    </div>
                    <div className={`${styles.chatIndicatorSection} ${showWelcomeMessage ? styles.chatIndicatorSection_welcomePage : ''}`}>
                      <div className={styles.chatIndicatorSectionLeft}>
                        <div className={styles.chatIndicatorIcon}>
                          <div className={styles.chatIndicator}></div>
                          <IconSvg path={messageNavIcon} width={15} height={15} viewBoxSize="0 0 15 15"></IconSvg>
                        </div>
                        <p>Чат с ботом</p>
                      </div>
                      {/* <div className={styles.chatRatingSection}>
                        <button className={styles.chatRatingUp}>
                          <IconSvg path={ratingChangeNavIcon} viewBoxSize='0 0 32 32' width={30} height={30} />
                        </button>
                        <button className={styles.chatRatingDown}>
                          <IconSvg path={ratingChangeNavIcon} viewBoxSize='0 0 32 32' width={30} height={30} />
                        </button>
                      </div> */}
                    </div>
                  </>
                )}
              </div>

              {showWelcomeMessage ? (
                <>
                  <div className={`${styles.welcomeMessage}`}>
                    <div className={styles.welcomeMessageUser}>
                      <IconSvg path={userNavIcon} viewBoxSize="0 0 72 72" width={100} height={100}></IconSvg>
                    </div>
                    <div></div>
                    <p>
                      Привет, <span>Пользователь</span>! Приятно тебя здесь видеть! Нажимая кнопку «Начать чат», вы соглашаетесь на обработку своих
                      персональных данных, как описано в нашей Политике конфиденциальности
                    </p>

                    <Button variant={'newPrimary'} onClick={handleCreateChat} className={styles.welcomeMessageButton} text="Начать чат"></Button>
                  </div>

                  <Button
                    className={styles.start_new_chat_btn}
                    variant="newSecondary"
                    onClick={handleCreateChat}
                    disabled={isChatSelectionDisabled}
                    text="Начать чат"
                  ></Button>
                </>
              ) : (
                <>
                  {
                    <div className={`${styles.bottomPane} ${isDialogOpen && styles.paneOpen}`}>
                      {isCreatingChatDisabled && !isLoading ? (
                        <div className={styles.loadingSpinner}>
                          <div className={styles.spinner}></div>
                          <span> Создание нового чата...</span>
                        </div>
                      ) : isLoadingMessages && selectedChatId !== 1 ? (
                        <div className={styles.loadingSpinner}>
                          <div className={styles.spinner}></div>
                          <span> Загрузка сообщений...</span>
                        </div>
                      ) : (
                        <>
                          <div className={styles.messageContainer} ref={messageContainerRef}>
                            {userQuestions.length === 0 && !isLoading ? (
                              <div className={styles.messageContainer_info_wrapper}>
                                <p className={styles.messageContainer_info}>Отправьте сообщение боту, чтобы начать диалог</p>
                              </div>
                            ) : (
                              userQuestions.map((userQuestion: { sender_question: string }, index: number) => (
                                <div key={index} className={index === 1 ? `${styles.message} first-message` : styles.message}>
                                  <div className={styles.messageContainer_user}>
                                    <span>
                                      <b>Пользователь</b>
                                      <div className={styles.messageContainer_user_question}>{userQuestion.sender_question}</div>
                                    </span>
                                  </div>

                                  {index < botAnswers.length && (
                                    <div className={styles.messageContainer_bot_wrapper}>
                                      <div className={styles.chatIndicatorContainer}>
                                        <div className={styles.chatIndicatorIcon}>
                                          <div className={styles.chatIndicator}></div>
                                          <IconSvg path={messageNavIcon} width={24} height={24} viewBoxSize="0 0 24 24"></IconSvg>
                                        </div>
                                      </div>
                                      <div className={styles.messageContainer_bot} key={index} style={{ wordWrap: 'break-word' }}>
                                        <p>OverAi bot</p>
                                        <div className={styles.messageContainer_bot_answer}>{formatBotAnswer(botAnswers[index].answer)}</div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))
                            )}

                            {isLoading ? (
                              <div className={styles.message}>
                                <div className={styles.messageContainer_user}>
                                  <span>
                                    <b>Пользователь</b>
                                    <div className={styles.messageContainer_user_question}>{bufUserQuestion}</div>
                                  </span>
                                </div>

                                <div className={styles.messageContainer_bot_wrapper}>
                                  <div className={styles.chatIndicatorContainer}>
                                    <div className={styles.chatIndicatorIcon}>
                                      <div className={styles.chatIndicator}></div>
                                      <IconSvg path={messageNavIcon} width={24} height={24} viewBoxSize="0 0 24 24"></IconSvg>
                                    </div>
                                  </div>
                                  <div className={styles.messageContainer_bot} style={{ wordWrap: 'break-word' }}>
                                    <p>OverAi bot</p>
                                    <div className={`${styles.messageContainer_bot_answer} ${styles.messageContainer_bot_answer_loading}`}>
                                      {dots}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      )}

                      {error && (
                        <div className={`${styles.errorContainer} ${error && styles.visible}`}>
                          <span className={styles.errorText}>{error}</span>
                        </div>
                      )}

                      {warning && (
                        <div className={`${styles.warningContainer} ${warning && styles.visible}`}>
                          <span className={styles.warningText}>{warning}</span>
                        </div>
                      )}

                      <div className={styles.inputContainer_wrapper}>
                        <div className={styles.inputContainer}>
                          {isCreatingChatDisabled && !isLoading ? (
                            <div className={styles.loadingSpinner}>
                              <div className={styles.spinner}></div>
                              <span> Создание чата...</span>
                            </div>
                          ) : isLoading ? (
                            <div className={styles.loadingSpinner}>
                              <div className={styles.spinner}></div>
                              <span> Генерация сообщения...</span>
                            </div>
                          ) : (
                            <>
                              <textarea
                                ref={textareaRef}
                                rows={1}
                                placeholder="Отправьте сообщение..."
                                value={messageInput}
                                onChange={e => setMessageInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                              />
                              <Button
                                className={styles.send_message_btn}
                                text="Генерировать"
                                variant="newSecondary"
                                onClick={() => handleSendMessage(messageInput)}
                                disabled={isChatSelectionDisabled}
                              >
                                <IconSvg path={aiButtonNavIcon} width={20} height={20} viewBoxSize={'0 0 20 20'}></IconSvg>
                              </Button>

                              <Button
                                className={`${styles.send_message_btn_mobile}`}
                                text=""
                                variant="newSecondary"
                                onClick={() => handleSendMessage(messageInput)}
                                disabled={isChatSelectionDisabled}
                              >
                                <IconSvg path={aiMobileButtonNavIcon} width={24} height={24} viewBoxSize={'0 0 24 24'}></IconSvg>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  }
                </>
              )}
            </div>
          </div>
        </div>
      }
      <ChatList
        setShowChatListForm={setShowChatListForm}
        showChatListForm={showChatListForm}
        chatData={chatData}
        selectedChatId={selectedChatId!}
        handleDragEnd={handleDragEnd}
        handleDragOver={handleDragOver}
        handleDragStart={handleDragStart}
        selectChat={selectChat}
        handleDeleteChat={handleDeleteChat}
        handleCreateChat={handleCreateChat}
        isCreatingChatDisabled={isCreatingChatDisabled}
      />
    </div>
  )
}

export default ChatGPT
