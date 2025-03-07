import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'components/common/Button/Button'
import {
  SendMessagePayload,
  useSendMessageMutation,
  useLazyFetchLatestMessagesQuery,
  useCreateChatMutation,
  useLazyFetchLatestChatsQuery,
  useLazyFetchWelcomeMessageQuery,
  useUpdateWelcomeMessageMutation,
  useDeleteChatMutation,
  useAssignChatOrderMutation,
  CreateChatPayload,
} from '../../api/chatgptService';
import OverAiIcon from '../../assets/img/common/newIconModal.svg';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { CloseIconPath, ListMessagesIconPath } from 'assets/Icons/svgIconPath';
import { aiButtonNavIcon, messageNavIcon, userNavIcon } from './svg/svgIconPath';
import styles from './chatgpt.module.scss';
import { log } from 'console';

interface Chat {
  id: number;
  order: number;
}

interface ChatGPTProps {
  openChatModal: () => void;
  closeChatModal: () => void;
}


const ChatGPT: React.FC<ChatGPTProps> = ({ openChatModal, closeChatModal }) => {
  const [messageInput, setMessageInput] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const [chatData, setChatData] = useState<{ [id: number]: { order: number; chat_name: string } }>({});
  const [selectedChatId, setCreatedChatId] = useState<number>();
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingChats, setIsFetchingChats] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  const [isChatSelectionDisabled, setIsChatSelectionDisabled] = useState(false);
  const [isCreatingChatDisabled, setIsCreatingChatDisabled] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);
  const [draggedChatId, setDraggedChatId] = useState<number | null>(null);
  const [draggedOverChatId, setDraggedOverChatId] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('RU');

  const [refetchChats, { data: latestChats }] = useLazyFetchLatestChatsQuery();
  const [refetchMessages, { data: latestMessages }] = useLazyFetchLatestMessagesQuery();
  // const [fetchWelcomeMessage, { data: welcomeMessageData }] = useLazyFetchWelcomeMessageQuery();

  // const [updateWelcomeMessage] = useUpdateWelcomeMessageMutation();
  const [createChatMutation] = useCreateChatMutation();
  const [sendMessage] = useSendMessageMutation();
  const [deleteChat] = useDeleteChatMutation();
  const [assignChatOrder] = useAssignChatOrderMutation();

  const userQuestions = latestMessages && latestMessages[0] && Array.isArray(latestMessages[0]) ? latestMessages[0] : [];
  const botAnswers = latestMessages && latestMessages[1] && Array.isArray(latestMessages[1]) ? latestMessages[1] : [];

  const [dots, setDots] = useState('.');
  const listOfChatContainerRef = useRef<HTMLDivElement | null>(null);
  const activeChatRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [bufUserQuestion, setBufUserQuestion] = useState('');

  useEffect(() => { scrollMessagesToBottom(); }, [isLoading])

  useEffect(() => {


    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === '...') return '.';
        return prevDots + '.';
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTextAreaFocus();
    scrollToSelectedChat();
    // console.log(userQuestions);

    const fetchData = async () => {
      // console.log(isDialogOpen, selectedChatId, refetchMessages, isChatSelected);
      // if (!isDialogOpen || selectedChatId === null) return;
  
      setError(null);
      // console.log('showWelcomeMessage: ' + showWelcomeMessage)
      setIsLoadingMessages(true);
      setIsFetchingChats(true);

      if (!chatsLoaded) {

        await fetchChats();

      }

      setIsFetchingChats(false);

      console.log(isCreatingChatDisabled)

      if (selectedChatId && refetchMessages && isChatSelected) {
        // console.log('gg');
        try {
          await refetchMessages({ overai_chat_id: selectedChatId });
          scrollMessagesToBottom();
        } catch (error) {
          setError('Ошибка получения сообщений');
        } finally {
          setIsLoadingMessages(false);
        }
      } else {
        setIsLoadingMessages(false);
      }
    };

    fetchData();


    //   if (!hasFetched) {
    //     fetchData();
    //     setHasFetched(true);
    //     console.log('hhhey');
    // }
  }, [selectedChatId, refetchMessages, isChatSelected, chatsLoaded, showWelcomeMessage]);

  const setTextAreaFocus = () => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  }

  const scrollToSelectedChat = () => {
    if (activeChatRef.current) {
      activeChatRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  const scrollMessagesToBottom = () => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  const toggleDialog = async () => {
    setIsDialogOpen(!isDialogOpen);
    scrollMessagesToBottom();
    setTextAreaFocus();
    isDialogOpen ? openChatModal() : closeChatModal();

    // const response = await fetchWelcomeMessage();
    // if (response.data) {
    // setShowWelcomeMessage(response.data.show_welcome_message);
    // }


  };



  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
      closeChatModal();
    }
  };

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSendMessage(messageInput);
  //   } else if (e.key === 'Enter' && e.shiftKey) {
  //     e.preventDefault();
  //     setMessageInput(messageInput + '\n');
  //   }
  // };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(messageInput);
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setMessageInput(prev => prev + '\n');
    }
  };

  // const formatBotAnswer = (answer: string): JSX.Element => {
  //   const escapeHtml = (str: string): string => {
  //     return str.replace(/&/g, '&amp;')
  //       .replace(/</g, '&lt;')
  //       .replace(/>/g, '&gt;')
  //       .replace(/"/g, '&quot;')
  //       .replace(/'/g, '&#039;')
  //       .replace(/####/g, '')
  //       .replace(/\*\*(.*?)\*\*/g, (_, content) => `<strong>${content}</strong>`);
  //   };
  //   const codeBlockRegex = /```([\s\S]*?)```/g;
  //   const replaceCodeBlocks = (_: any, code: string) => {
  //     const lines = code.trim().split('\n').map((line: string, index: number) => (
  //       `${line}\n`
  //     ));
  //     return `${lines.join('')}`;
  //   };

  //   let formattedAnswer = answer.replace(codeBlockRegex, replaceCodeBlocks);

  //   const codeBlocks = formattedAnswer.split(codeBlockRegex);
  //   const processedBlocks = codeBlocks.map((block, index) => {
  //     if (index % 2 === 0) {
  //       return escapeHtml(block);
  //     } else {
  //       return block;
  //     }
  //   });

  //   formattedAnswer = processedBlocks.join('');

  //   return (
  //     <div
  //       dangerouslySetInnerHTML={{ __html: formattedAnswer }}
  //     />
  //   );
  // };

  const formatBotAnswer = (answer: string): JSX.Element => {
    const escapeHtml = (str: string): string => {
      return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/####/g, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    const codeBlockRegex = /```([\s\S]*?)```/g;
    const formattedAnswer = answer.replace(codeBlockRegex, (_, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });

    return <div dangerouslySetInnerHTML={{ __html: escapeHtml(formattedAnswer) }} />;
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      scrollMessagesToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [latestMessages, isDialogOpen, selectedChatId]);



  const selectChat = (chatId: number | undefined) => {
    setShowWelcomeMessage(false)
    if (!isChatSelectionDisabled) {
      let selectedChatId: number | undefined = chatId;

      if (chatId === undefined || chatId === 1) {
        // Ищем объект с order === 1 в chatData
        for (const [id, chat] of Object.entries(chatData)) {
          if (chat.order === 1) {
            selectedChatId = Number(id); // Преобразуем ключ обратно в число
            break;
          }
        }
      }



      if (selectedChatId !== undefined) {
        setCreatedChatId(selectedChatId);
        setIsChatSelected(true);
        setDraggedChatId(selectedChatId);
      }
    }

    // console.log(chatData);
  };


  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, chatId: number) => {
    e.dataTransfer.setData('text/plain', '');
    setDraggedChatId(chatId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, chatId: number) => {
    e.preventDefault();
    setDraggedOverChatId(chatId);
  };


  const handleDragEnd = async () => {
    if (draggedChatId !== null && draggedOverChatId !== null && draggedChatId !== draggedOverChatId) {
      const updatedChatDataCopy = JSON.parse(JSON.stringify(chatData));
      const dragOrder = updatedChatDataCopy[draggedChatId].order;
      const dropOrder = updatedChatDataCopy[draggedOverChatId].order;

      Object.keys(updatedChatDataCopy).forEach((chatIdStr) => {
        const chatId = parseInt(chatIdStr, 10);
        const order = updatedChatDataCopy[chatId].order;
        if (order > dragOrder && order <= dropOrder) {
          updatedChatDataCopy[chatId].order -= 1;
        } else if (order < dragOrder && order >= dropOrder) {
          updatedChatDataCopy[chatId].order += 1;
        }
      });

      updatedChatDataCopy[draggedChatId].order = dropOrder;
      setChatData(updatedChatDataCopy);

      try {
        await assignChatOrder(updatedChatDataCopy);
      } catch (error) {
        console.error("Ошибка при обновлении порядка чатов на сервере:", error);
        setChatData(chatData);
      } finally {
        setDraggedChatId(null);
        setDraggedOverChatId(null);
      }
    }
  };

  // const handleCreateEmptyChat = async () => {
  //   setShowWelcomeMessage(false);
  //   setCreatedChatId(1);
  //   setIsChatSelected(true);
  // };


  function getAllMethods(obj: object): string[] {
    const methods: string[] = [];
    let currentObj = obj;

    while (currentObj) {
      Object.getOwnPropertyNames(currentObj).forEach((prop) => {
        if (typeof currentObj[prop as keyof typeof currentObj] === 'function' && !methods.includes(prop)) {
          methods.push(prop);
        }
      });
      currentObj = Object.getPrototypeOf(currentObj);
    }

    return methods;
  }


  const createChat = async () => {
    try {
      setIsChatSelected(true);
      setIsCreatingChatDisabled(true);
      const convertToCreateChatPayload = (chatData: { [id: number]: { order: number; chat_name: string } }): CreateChatPayload => {
        const orderData = Object.entries(chatData).map(([id, { order }]) => ({ id: Number(id), order }));
        return { orderData };
      };

      const payload: CreateChatPayload = convertToCreateChatPayload(chatData);

      const response = await createChatMutation(payload);
      if ('data' in response && response.data !== undefined) {
        const newChatId = response.data.overai_chat_id;

        await fetchChats();
        console.log(newChatId);
        setCreatedChatId(newChatId);
        return response.data;
      } else {
        setError('Ошибка при создании чата.');
        return null;
      }
    } catch (error) {
      setError('Ошибка при создании чата.');
      return null;
    } finally {
      setIsCreatingChatDisabled(false);
    }
  };

  // const createChat = async () => {
  //   try {


  //     setIsChatSelected(false); //true
  //     setIsCreatingChatDisabled(true);
  //     const convertToCreateChatPayload = (chatData: { [id: number]: { order: number; chat_name: string } }): CreateChatPayload => {
  //       const orderData = Object.entries(chatData).map(([id, { order }]) => ({ id: Number(id), order }));
  //       return { orderData };
  //     };

  //     const payload: CreateChatPayload = convertToCreateChatPayload(chatData);

  //     const response = await createChatMutation(payload);
  //     if ('data' in response && response.data !== undefined) {
  //       const newChatId = response.data.overai_chat_id;
  //       await fetchChats();
  //       setCreatedChatId(newChatId);
  //       return response.data;
  //     } else {
  //       setError('Ошибка при создании чата.');
  //       return null;
  //     }
  //   } catch (error) {
  //     setError('Ошибка при создании чата.');
  //     return null;
  //   } finally {
  //     setIsCreatingChatDisabled(false);
  //   }
  // };


  // const createChat = async () => {
  //   let tempChatId: number | null = null; // Объявляем tempChatId здесь

  //   try {
  //     setIsChatSelected(false);
  //     setIsCreatingChatDisabled(true);

  //     // Генерация временного ID для нового чата (для оптимистичного обновления)
  //     tempChatId = Date.now(); // Используем временную метку как ID
  //     const newChat = {
  //       id: tempChatId,
  //       order: 1, // Новый чат будет первым
  //       chat_name: 'Новый чат', // Можно задать имя по умолчанию
  //     };

  //     // Оптимистичное обновление состояния на клиенте
  //     setChatData((prevChatData) => {
  //       // Сдвигаем порядок всех существующих чатов на +1
  //       const updatedChatData = Object.entries(prevChatData).reduce((acc, [id, chat]) => {
  //         acc[Number(id)] = { ...chat, order: chat.order + 1 };
  //         return acc;
  //       }, {} as { [id: number]: { order: number; chat_name: string } });

  //       // Добавляем новый чат в начало
  //       return {
  //         [tempChatId!]: newChat,
  //         ...updatedChatData,
  //       };
  //     });

  //     // Преобразование данных для отправки на сервер
  //     const convertToCreateChatPayload = (chatData: {
  //       [id: number]: { order: number; chat_name: string };
  //     }): CreateChatPayload => {
  //       const orderData = Object.entries(chatData).map(([id, { order }]) => ({
  //         id: Number(id),
  //         order,
  //       }));
  //       return { orderData };
  //     };

  //     const payload: CreateChatPayload = convertToCreateChatPayload(chatData);

  //     // Отправка запроса на сервер
  //     const response = await createChatMutation(payload);

  //     // Обработка ответа от сервера
  //     if ('data' in response && response.data !== undefined) {
  //       const newChatId = response.data.overai_chat_id;

  //       // Обновление состояния с реальным ID от сервера
  //       setChatData((prevChatData) => {
  //         const { [tempChatId!]: tempChat, ...rest } = prevChatData;
  //         return {
  //           [newChatId]: { ...tempChat, id: newChatId },
  //           ...rest,
  //         };
  //       });

  //       await fetchChats(); // Обновление списка чатов (если нужно)
  //       setCreatedChatId(newChatId);
  //       return response.data;
  //     } else {
  //       // Если сервер вернул ошибку, откатываем оптимистичное обновление
  //       setChatData((prevChatData) => {
  //         const { [tempChatId!]: _, ...rest } = prevChatData;
  //         return rest;
  //       });
  //       setError('Ошибка при создании чата.');
  //       return null;
  //     }
  //   } catch (error) {
  //     // Откат изменений в случае ошибки
  //     if (tempChatId !== null) {
  //       setChatData((prevChatData) => {
  //         const { [tempChatId!]: _, ...rest } = prevChatData;
  //         return rest;
  //       });
  //     }
  //     setError('Ошибка при создании чата.');
  //     return null;
  //   } finally {
  //     setIsCreatingChatDisabled(false);
  //   }
  // };


  const handleCreateChat = async () => {

    setShowWelcomeMessage(false);
    // if (updateWelcomeMessage !== null) {
    // await updateWelcomeMessage();
    // }
    await createChat();
    setShowWelcomeMessage(false);
  };

  const fetchChats = async () => {///??
    try {

      (userQuestions)
      if (refetchChats) {
        const response = await refetchChats(); ////

        if (response.status === 'fulfilled' && response.isSuccess) {
          const receivedChatData = response.data;
          setChatData(receivedChatData);
          setChatsLoaded(true);
        } else {
          setError('Ошибка при получении списка чатов.');
        }
      }
    } catch (error) {
      setError('Ошибка при получении списка чатов.');
    }
  };


  // const handleDeleteChat = async (chatId: number) => {
  //   const orderData = Object.entries(chatData).map(([id, chat]) => ({ id: Number(id), order: chat.order }));
  //   console.log(orderData)
  //   console.log(chatData)
  //   await deleteChat({ chat_id: chatId, orderData });
  //   await fetchChats();
  //   setCreatedChatId(undefined)
  // };

  const handleDeleteChat = async (chatId: number) => {
    const previousChatData = { ...chatData }; // Сохраняем копию состояния

    if (chatId === selectedChatId) {
      selectChat(undefined);
    }

    const chatArray = Object.entries(chatData).map(([id, chat]) => ({
      id: Number(id),
      ...chat
    }));

    const orderData = chatArray
      .map(chat => ({ id: chat.id, order: chat.order }))
      .filter(chat => chat.id !== chatId);

    const updatedChatData = chatArray.filter(chat => chat.id !== chatId);
    const newChatData = Object.fromEntries(updatedChatData.map(chat => [chat.id, { order: chat.order, chat_name: chat.chat_name }]));

    setChatData(newChatData);

    try {
      await deleteChat({ chat_id: chatId, orderData });
      await fetchChats();
    } catch (error) {
      setChatData(previousChatData); // Возвращаем старые данные в случае ошибки
      setError('Ошибка при удалении чата.');
    }

    setCreatedChatId(undefined);
  };



  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };


  const handleSendMessage = async (messageInput: string) => {
    if (messageInput.trim() === '') return;
    setBufUserQuestion(messageInput);
    scrollMessagesToBottom();
    try {
      setIsLoading(true);
      setIsChatSelectionDisabled(true);
      setIsCreatingChatDisabled(true);

      const payload: SendMessagePayload = {
        message: messageInput,
        overai_chat_id: selectedChatId === 1 ? (await createChat())?.overai_chat_id : selectedChatId!,
        language: selectedLanguage
      };

      const botResponseTimeout = setTimeout(() => {
        setError('Генерация сообщения займет некоторое время...');
      }, 10000);

      await sendMessage(payload);

      if (refetchMessages) {
        await refetchMessages({ overai_chat_id: payload.overai_chat_id });
      }

      setMessageInput('');
      setError(null);
      clearTimeout(botResponseTimeout);
    } catch (error: unknown) {
      setError('Ошибка при отправке сообщения.');
    } finally {
      setIsLoading(false);
      setIsChatSelectionDisabled(false);
      setIsCreatingChatDisabled(false);
    }
    setTextAreaFocus();
    setTimeout(() => {
      setError(null);
    }, 3000);
  };




  return (
    <div className="fixed-button">
      <button className={styles.chatGptButton} onClick={toggleDialog}>
        <img className={`${isDialogOpen && styles.chatGptButton_Pushed}`} src={OverAiIcon} alt="OverAI Icon" />
      </button>
      {isDialogOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={`${styles.dialog} ${isDialogOpen && styles.dialogOpen} ${showWelcomeMessage && styles.noGradient}`}>
            {/* <button className={styles.chatgpt_close} onClick={toggleDialog}>
              <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
            </button> */}
            <div className={`${styles.contentContainer}`}>

              <div className={`${styles.topPane} ${isDialogOpen && styles.paneOpen}`}>
                <div className={styles.overAiText}><div className={styles.ai_mobile_open_dialog_list}><IconSvg path={ListMessagesIconPath} width={30} height={30} viewBoxSize='0 0 30 30'></IconSvg></div>
                  <p>OVER AI</p>
                  <div className={styles.ai_mobile_close_btn_wrapper} onClick={() => setIsDialogOpen(false)}><div className={styles.ai_mobile_close_btn}></div></div>
                </div>
                {isFetchingChats ? (
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    <span>Получение чатов...</span>
                  </div>
                ) : (
                  <>
                    <div className={styles.listOfChatSection}>
                      <button className={styles.createChatButtonModal} onClick={handleCreateChat} disabled={isCreatingChatDisabled}>
                        <b>+</b>
                      </button>
                      <div className={styles.listOfChatContainer} ref={listOfChatContainerRef}>
                        {Object.entries(chatData)
                          .sort(([, a], [, b]) => a.order - b.order)
                          .map(([chatId, chatValue]) => {
                            const isActive = selectedChatId === Number(chatId);
                            return (
                              <div key={chatId}
                                draggable
                                onDragStart={(e) => handleDragStart(e, Number(chatId))}
                                onDragOver={(e) => handleDragOver(e, Number(chatId))}
                                onDragEnd={handleDragEnd}
                                className={` ${styles.chatListItemWrapper}`}
                              >
                                <div
                                  onClick={() => {
                                    selectChat(Number(chatId))
                                  }}
                                  ref={isActive ? activeChatRef : null}
                                  className={`${draggedOverChatId === Number(chatId) ? styles.draggedOver : ''} ${styles.chatListItem} ${selectedChatId === Number(chatId) ? styles.activeChat : ''}`}
                                  style={{ borderRadius: '20px' }}
                                >
                                  <div className={styles.chatListItem_Circle}></div>
                                  <span className={styles.centeredText}>
                                    {`${chatValue.chat_name.length > 25 ? chatValue.chat_name.substring(0, 25) + '...' : chatValue.chat_name}`}
                                  </span>
                                </div>
                                <button className={styles.deleteChatBtn} onClick={(e) => {
                                  // e.stopPropagation(); // Предотвращаем всплытие события
                                  handleDeleteChat(Number(chatId));
                                }}>
                                  <div className={styles.close_cross}></div>
                                </button>
                              </div>
                            )
                          }
                          )}
                      </div>
                      {/* <button className={styles.chatMessageHistoryButton}>
                        <IconSvg path={arrowUpNavIcon} viewBoxSize='0 0 17 17' width={14} height={14} />
                      </button> */}
                    </div>
                    <div className={styles.chatIndicatorSection}>
                      <div className={styles.chatIndicatorSectionLeft}>
                        <div className={styles.chatIndicatorIcon}>
                          <div className={styles.chatIndicator}></div>
                          <IconSvg path={messageNavIcon} width={15} height={15} viewBoxSize='0 0 15 15'></IconSvg>
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
                      <IconSvg path={userNavIcon} viewBoxSize='0 0 72 72' width={100} height={100}></IconSvg>
                    </div>
                    <div></div>
                    <p>Привет, <span>Пользователь</span>! Приятно тебя здесь видеть! Нажимая кнопку «Начать чат», вы соглашаетесь на обработку своих персональных данных, как описано в нашей Политике конфиденциальности</p>

                    <Button variant={'newPrimary'} onClick={() => console.log('hehe')} className={styles.welcomeMessageButton} text='Начать чат'></Button>

                  </div>


                  <Button className={styles.start_new_chat_btn} variant='newSecondary' onClick={handleCreateChat} disabled={isChatSelectionDisabled} text='Начать чат'>
                  </Button>

                  {/* <div className={styles.inputContainer}>
                    {isLoading ? (
                      <div className={styles.loadingSpinner}>
                        <div className={styles.spinner}></div>
                        <span> Генерация сообщения...</span>
                      </div>
                    ) : isCreatingChatDisabled ? (
                      <div className={styles.loadingSpinner}>
                        <div className={styles.spinner}></div>
                        <span> Создание чата...</span>
                      </div>
                    ) : (
                      <> */}
                  {/* // <textarea
                          rows={1}
                          placeholder="Отправьте сообщение..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={handleKeyPress}
                        /> */}

                  {/* </> */}
                  {/* // )} */}
                  {/* </div> */}
                </>



              ) : (
                <>
                  {selectedChatId && (
                    <div className={`${styles.bottomPane} ${isDialogOpen && styles.paneOpen}`}>
                      {isCreatingChatDisabled && !isLoading ? (
                        <div className={styles.loadingSpinner}>
                          <div className={styles.spinner}></div>
                          <span> Создание нового чата...</span>
                        </div>
                      ) : (isLoadingMessages && selectedChatId !== 1) ? (
                        <div className={styles.loadingSpinner}>
                          <div className={styles.spinner}></div>
                          <span> Загрузка сообщений...</span>
                        </div>
                      ) : (
                        <>
                          <div className={styles.messageContainer} ref={messageContainerRef}>
                            {userQuestions.length === 0 && !isLoading ? (
                              <div className={styles.messageContainer_info_wrapper}>
                                <p className={styles.messageContainer_info}>
                                  Отправьте сообщение боту, чтобы начать диалог
                                </p>
                              </div>
                            ) : (
                              userQuestions.map((userQuestion: { sender_question: string }, index: number) => (
                                <div key={index} className={index === 1 ? `${styles.message} first-message` : styles.message}>
                                  <div className={styles.messageContainer_user}>
                                    <span>
                                      <b>Пользователь</b>
                                      <div className={styles.messageContainer_user_question}>
                                        {userQuestion.sender_question}
                                      </div>
                                    </span>
                                  </div>

                                  {index < botAnswers.length && (
                                    <div className={styles.messageContainer_bot_wrapper}>
                                      <div className={styles.chatIndicatorContainer}>
                                        <div className={styles.chatIndicatorIcon}>
                                          <div className={styles.chatIndicator}></div>
                                          <IconSvg path={messageNavIcon} width={24} height={24} viewBoxSize='0 0 24 24'></IconSvg>
                                        </div>
                                      </div>
                                      <div className={styles.messageContainer_bot} key={index} style={{ wordWrap: 'break-word' }}>
                                        <p>OverAi bot</p>
                                        <div className={styles.messageContainer_bot_answer}>
                                          {formatBotAnswer(botAnswers[index].answer)}
                                        </div>
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
                                    <div className={styles.messageContainer_user_question}>
                                      {bufUserQuestion}
                                    </div>
                                  </span>
                                </div>

                                <div className={styles.messageContainer_bot_wrapper}>
                                  <div className={styles.chatIndicatorContainer}>
                                    <div className={styles.chatIndicatorIcon}>
                                      <div className={styles.chatIndicator}></div>
                                      <IconSvg path={messageNavIcon} width={24} height={24} viewBoxSize='0 0 24 24'></IconSvg>
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
                            ) : (<></>)}

                          </div>

                        </>

                      )}


                      {error && (
                        <div className={`${styles.errorContainer} ${error && styles.visible}`}>
                          <span className={styles.errorText}>{error}</span>
                        </div>
                      )}
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
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyDown={handleKeyPress}
                            />
                            <Button className={styles.send_message_btn} text='Генерировать' variant='newSecondary' onClick={() => handleSendMessage(messageInput)} disabled={isChatSelectionDisabled}>
                              <IconSvg path={aiButtonNavIcon} width={20} height={20} viewBoxSize={'0 0 20 20'}></IconSvg>
                              {/* <svg viewBox="0 0 16 13" fill="none" xmlns="http://www.w3 org/2000/svg">
                                <path d="M7.17278 1.21787C7.56956 0.633707 8.43044 0.633706 8.82722 1.21787L15.5994 11.1881C16.0503 11.8521 15.5748 12.75 14.7722 12.75H1.22785C0.425231 12.75 -0.0503452 11.8521 0.400629 11.1881L7.17278 1.21787Z" fill="white"/>
                            </svg> */}

                            </Button>
                            {/* <div style={{ zIndex: '10000000' }}>
                            <select
                              value={selectedLanguage}
                              onChange={handleLanguageChange}
                              disabled={isChatSelectionDisabled}
                              style={{
                                height: '39px',
                                backgroundColor: '#9b48ed',
                                color: 'white',
                                border: 'none',
                                padding: '5px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                outline: 'none',
                                boxShadow: 'none'
                              }}
                            >
                              <option value="RU">RU</option>
                              <option value="ENG">ENG</option>
                            </select>
                          </div> */}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;

