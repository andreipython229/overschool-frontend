import React, { useState, useRef, useEffect } from 'react';
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
import arrowUp from '../../assets/img/common/arrow-up.svg'
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { deleteIconPath } from 'components/Questions/config/svgIconPath';


import { aiButtonIcon } from './constants/svgIcon';
import { aiButtonNavIcon, arrowUpNavIcon, messageNavIcon, ratingChangeNavIcon, userNavIcon } from './svg/svgIconPath';
import styles from './chatgpt.module.scss';
import { style } from 'd3-selection';


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
  const [fetchWelcomeMessage, { data: welcomeMessageData }] = useLazyFetchWelcomeMessageQuery();

  const [updateWelcomeMessage] = useUpdateWelcomeMessageMutation();
  const [createChatMutation] = useCreateChatMutation();
  const [sendMessage] = useSendMessageMutation();
  const [deleteChat] = useDeleteChatMutation();
  const [assignChatOrder] = useAssignChatOrderMutation();

  const userQuestions = latestMessages && latestMessages[0] && Array.isArray(latestMessages[0]) ? latestMessages[0] : [];
  const botAnswers = latestMessages && latestMessages[1] && Array.isArray(latestMessages[1]) ? latestMessages[1] : [];

  useEffect(() => {
    const fetchData = async () => {
      if (isDialogOpen !== false && selectedChatId == null) {
        setError(null);

        if (showWelcomeMessage !== true) {
          setShowWelcomeMessage(false);
        } else {
          setShowWelcomeMessage(true);
        }

        setIsLoadingMessages(true);
        setIsFetchingChats(true);

        if (!chatsLoaded) {
          await fetchChats();
        }

        setIsFetchingChats(false);

      } else if (isDialogOpen !== false && selectedChatId !== null) {
        setError(null);

        if (showWelcomeMessage !== true) {
          setShowWelcomeMessage(false);
        } else {
          setShowWelcomeMessage(true);
        }

        setIsLoadingMessages(true);
        setIsFetchingChats(true);

        if (!chatsLoaded) {
          await fetchChats();
        }

        setIsFetchingChats(false);

        if (selectedChatId && refetchMessages && isChatSelected) {
          try {
            await refetchMessages({ overai_chat_id: selectedChatId });
            setFocusToBottom();
          } catch (error) {
            setError('Ошибка получения сообщений');
          } finally {
            setIsLoadingMessages(false);
          }
        } else {
          setIsLoadingMessages(false);
        }
      }
    };

    fetchData();
  }, [isDialogOpen, selectedChatId, refetchMessages, isChatSelected, chatsLoaded, showWelcomeMessage, deleteChat]);


  const toggleDialog = async () => {
    setIsDialogOpen(!isDialogOpen);
    setFocusToBottom();
    isDialogOpen ? closeChatModal() : openChatModal();
    const response = await fetchWelcomeMessage();
    if (response.data) {
      setShowWelcomeMessage(response.data.show_welcome_message);
    }
  };

  const setFocusToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
      closeChatModal();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(messageInput);
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setMessageInput(messageInput + '\n');
    }
  };

  const formatBotAnswer = (answer: string): JSX.Element => {
    const escapeHtml = (str: string): string => {
      return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/####/g, '')
        .replace(/\*\*(.*?)\*\*/g, (_, content) => `<strong>${content}</strong>`);
    };
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const replaceCodeBlocks = (_: any, code: string) => {
      const lines = code.trim().split('\n').map((line: string, index: number) => (
        `${line}\n`
      ));
      return `${lines.join('')}`;
    };

    let formattedAnswer = answer.replace(codeBlockRegex, replaceCodeBlocks);

    const codeBlocks = formattedAnswer.split(codeBlockRegex);
    const processedBlocks = codeBlocks.map((block, index) => {
      if (index % 2 === 0) {
        return escapeHtml(block);
      } else {
        return block;
      }
    });

    formattedAnswer = processedBlocks.join('');

    return (
      <div
        dangerouslySetInnerHTML={{ __html: formattedAnswer }}
      />
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFocusToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [latestMessages, isDialogOpen, selectedChatId]);

  const selectChat = (chatId: number) => {
    if (!isChatSelectionDisabled) {
      setCreatedChatId(chatId);
      setIsChatSelected(true);
      setDraggedChatId(chatId);
    }
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

      await assignChatOrder(updatedChatDataCopy);
      setChatData(updatedChatDataCopy);
      setDraggedChatId(null);
      setDraggedOverChatId(null);
    }
  };

  const handleCreateEmptyChat = async () => {
    setCreatedChatId(1);
    setIsChatSelected(true);
  };

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

  const handleCreateChat = async () => {
    if (updateWelcomeMessage !== null) {
      await updateWelcomeMessage();
    }
    await createChat();
    setShowWelcomeMessage(true);
  };

  const fetchChats = async () => {
    try {
      if (refetchChats) {
        const response = await refetchChats();

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


  const handleDeleteChat = async (chatId: number) => {
    const orderData = Object.entries(chatData).map(([id, chat]) => ({ id: Number(id), order: chat.order }));
    await deleteChat({ chat_id: chatId, orderData });
    await fetchChats();
    setCreatedChatId(undefined)
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSendMessage = async (messageInput: string) => {
    if (selectedChatId === 1) {
      const response = await createChat();
      setIsLoading(true);
      setIsChatSelectionDisabled(true);
      setIsCreatingChatDisabled(true);
      const payload: SendMessagePayload = {
        message: messageInput,
        overai_chat_id: response?.overai_chat_id,
        language: selectedLanguage
      };

      const botResponseTimeout = setTimeout(() => {
        setError('Генерация сообщения займет некоторое время...');
      }, 10000);

      await sendMessage(payload);

      await refetchMessages({ overai_chat_id: response?.overai_chat_id });

      setMessageInput('');
      setError(null);
      clearTimeout(botResponseTimeout);

      setIsLoading(false);
      setIsChatSelectionDisabled(false);
      setIsCreatingChatDisabled(false);
    }
    if (selectedChatId !== 1 && messageInput.trim() !== '') {
      try {
        setIsLoading(true);
        setIsChatSelectionDisabled(true);
        setIsCreatingChatDisabled(true);

        const payload: SendMessagePayload = {
          message: messageInput,
          overai_chat_id: selectedChatId!,
          language: selectedLanguage
        };

        const botResponseTimeout = setTimeout(() => {
          setError('Генерация сообщения займет некоторое время...');
        }, 10000);

        await sendMessage(payload);

        if (refetchMessages) {
          await refetchMessages({ overai_chat_id: selectedChatId });
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

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
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
                <div className={styles.overAiText}>OVER AI</div>
                {isFetchingChats ? (
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    <span> Получение чатов...</span>
                  </div>
                ) : (
                  <>
                    <div className={styles.listOfChatSection}>
                      <button className={styles.createChatButtonModal} onClick={handleCreateEmptyChat} disabled={isCreatingChatDisabled}>
                        <b>+</b>
                      </button>
                      <div
                        className={styles.listOfChatContainer}
                      >
                        {Object.entries(chatData)
                          .sort(([, a], [, b]) => a.order - b.order)
                          .map(([chatId, chatValue]) => (
                            <div
                              key={chatId}
                              onClick={() => selectChat(Number(chatId))}
                              draggable
                              onDragStart={(e) => handleDragStart(e, Number(chatId))}
                              onDragOver={(e) => handleDragOver(e, Number(chatId))}
                              onDragEnd={handleDragEnd}
                              className={`${styles.chatListItem} ${selectedChatId === Number(chatId) ? styles.activeChat : ''} ${draggedOverChatId === Number(chatId) ? styles.draggedOver : ''}`}
                              style={{ borderRadius: '20px' }}
                            >
                              <div className={styles.chatListItem_Circle}></div>
                              <span className={styles.centeredText}>
                                {`${chatValue.chat_name.length > 25 ? chatValue.chat_name.substring(0, 25) + '...' : chatValue.chat_name}`}
                                <button className={styles.deleteChatBtn} onClick={() => handleDeleteChat(Number(chatId))}>
                                  <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
                                </button>
                              </span>
                            </div>
                          ))}
                      </div>
                      <button className={styles.chatMessageHistoryButton}>
                        <IconSvg path={arrowUpNavIcon} viewBoxSize='0 0 17 17' width={14} height={14} />
                      </button>
                    </div>
                    <div className={styles.chatIndicatorSection}>
                      <div className={styles.chatIndicatorSectionLeft}>
                        <div className={styles.chatIndicatorIcon}>
                          <div className={styles.chatIndicator}></div>
                          <IconSvg path={messageNavIcon} width={15} height={15} viewBoxSize='0 0 15 15'></IconSvg>
                        </div>
                        <p>Чат с ботом</p>
                      </div>
                      <div className={styles.chatRatingSection}>
                        <button className={styles.chatRatingUp}>
                          <IconSvg path={ratingChangeNavIcon} viewBoxSize='0 0 32 32' width={30} height={30} />
                        </button>
                        <button className={styles.chatRatingDown}>
                          <IconSvg path={ratingChangeNavIcon} viewBoxSize='0 0 32 32' width={30} height={30} />
                        </button>
                      </div>
                    </div>
                  </>
                )}

              </div>


              {!showWelcomeMessage || !isChatSelected ? (
                <>
                  <div className={`${styles.welcomeMessage}`}>
                    <div className={styles.welcomeMessageUser}>
                      <IconSvg path={userNavIcon} viewBoxSize='0 0 72 72' width={100} height={100}></IconSvg>
                    </div>
                    <p>Привет, <span>Пользователь</span>! приятно тебя здесь видеть! Нажимая кнопку «Начать чат», вы соглашаетесь на обработку своих персональных данных, как описано в нашей Политике конфиденциальности</p>
                  </div>


                  <div className={styles.inputContainer}>
                    {isLoading ? (
                      <div className={styles.loadingSpinner}>
                        <div className={styles.spinner}></div>
                        <span> Генерация сообщения...</span>
                      </div>
                    ) : (
                      <>
                        <textarea
                          rows={1}
                          placeholder="Отправьте сообщение..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={handleKeyPress}
                        />
                        <button onClick={handleCreateChat} disabled={isChatSelectionDisabled}>
                          Начать чат
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {selectedChatId && (
                    <div className={`${styles.bottomPane} ${isDialogOpen && styles.paneOpen}`}>

                      {isLoadingMessages && selectedChatId !== 1 ? (
                        <div className={styles.loadingSpinner}>
                          <div className={styles.spinner}></div>
                          <span> Загрузка сообщений...</span>
                        </div>
                      ) : (
                        <div className={styles.messageContainer} ref={messageContainerRef}>
                          {userQuestions.map((userQuestion: { sender_question: string }, index: number) => (
                            <div key={index} className={index == 1 ? `${styles.message} first-message` : styles.message}>
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
                          ))}
                        </div>
                      )}




                      {error && (
                        <div className={`${styles.errorContainer} ${error && styles.visible}`}>
                          <span className={styles.errorText}>{error}</span>
                        </div>
                      )}
                      <div className={styles.inputContainer}>
                        {isLoading ? (
                          <div className={styles.loadingSpinner}>
                            <div className={styles.spinner}></div>
                            <span> Генерация сообщения...</span>
                          </div>
                        ) : (
                          <>
                            <textarea
                              rows={1}
                              placeholder="Отправьте сообщение..."
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyDown={handleKeyPress}
                            />
                            <button onClick={() => handleSendMessage(messageInput)} disabled={isChatSelectionDisabled}>
                              <IconSvg path={aiButtonNavIcon} width={20} height={20} viewBoxSize={'0 0 20 20'}></IconSvg>
                              {/* <svg viewBox="0 0 16 13" fill="none" xmlns="http://www.w3 org/2000/svg">
                                <path d="M7.17278 1.21787C7.56956 0.633707 8.43044 0.633706 8.82722 1.21787L15.5994 11.1881C16.0503 11.8521 15.5748 12.75 14.7722 12.75H1.22785C0.425231 12.75 -0.0503452 11.8521 0.400629 11.1881L7.17278 1.21787Z" fill="white"/>
                            </svg> */}
                              Генерировать
                            </button>
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