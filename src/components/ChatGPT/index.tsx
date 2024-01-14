import React, { useState, useRef, useEffect } from 'react';
import { getUserIdFromLocalStorage } from 'utils/getUserId';
import { 
  SendMessagePayload,
  useSendMessageMutation, 
  useFetchLatestMessagesQuery, 
  useCreateChatMutation, 
  useFetchLatestChatsQuery,
  LatestChatsResponse 
} from '../../api/chatgptService';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import styles from './chatgpt.module.scss';
import { resolve } from 'path';

interface ChatGPTProps {
  openChatModal: () => void;
  closeChatModal: () => void;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ openChatModal, closeChatModal }) => {
  const [messageInput, setMessageInput] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const userId = getUserIdFromLocalStorage();
  const [selectedChatId, setCreatedChatId] = useState<number | null>(null);
  const { data: latestMessages = [], refetch: refetchMessages } = userId
  ? useFetchLatestMessagesQuery({
      userId: userId.toString(),
      overai_chat_id: selectedChatId ? selectedChatId.toString() : undefined,
    })
  : { data: [], refetch: undefined };

  const [sendMessage, mutation] = useSendMessageMutation();

  const [createChatMutation] = useCreateChatMutation();
  const [chatList, setChatList] = useState<Array<number>>([]);
  const { data: latestChats = [], refetch: refetchChats } = userId
  ? useFetchLatestChatsQuery(userId.toString())
  : { data: [], refetch: undefined };
  const [chatIdsArray, setChatIdsArray] = useState<Array<number>>([]);

  const userQuestions = Array.isArray(latestMessages[0]) ? latestMessages[0] : [];
  const botAnswers = Array.isArray(latestMessages[1]) ? latestMessages[1] : [];
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingChats, setIsFetchingChats] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  const [isChatSelectionDisabled, setIsChatSelectionDisabled] = useState(false);
  const [isCreatingChatDisabled, setIsCreatingChatDisabled] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
    setFocusToBottom();
    isDialogOpen ? closeChatModal() : openChatModal();
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(messageInput);
    }
  };

  const formatBotAnswer = (answer: string): JSX.Element => {
    let formattedAnswer = answer.replace(/\*\*(.*?)\*\*/g, (_, content) => `<strong>${content}</strong>`);
    formattedAnswer = formattedAnswer.replace(/####(.*?)/g, (_, content) => `${content}`);
    formattedAnswer = formattedAnswer.replace(/```(.*?)/g, (_, code) => {
        const lines = code.split('\n').map((line: string, index: number) => (
            `<pre key=${index} class="code-container">${line}</pre>`
        ));
        return `<div>${lines.join('')}</div>`;
    });

    return (
        <div
            dangerouslySetInnerHTML={{ __html: `<b style="color: #955dd3;">OVER AI:</b> ${formattedAnswer}` }}
            style={{ wordWrap: 'break-word', color: '#333' }}
        />
    );
};

  useEffect(() => {
    const fetchData = async () => {
      if (isDialogOpen) {
        setIsLoadingMessages(true);
        setIsFetchingChats(true);
        if (!chatsLoaded) {
          await fetchChats();
        }
        setIsFetchingChats(false);

        if (selectedChatId && refetchMessages && isChatSelected) {
          try {
            await refetchMessages();
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

    setError(null);
    fetchData();
  }, [isDialogOpen, selectedChatId, refetchMessages, isChatSelected, chatsLoaded]);

  useEffect(() => {
    setFocusToBottom();
  }, [latestMessages, isDialogOpen]);

  const selectChat = (chatId: number) => {
    if (!isChatSelectionDisabled) {
      setCreatedChatId(chatId);
      setIsChatSelected(true);
    }
  };

  const createChat = async () => {
    try {
      if (userId !== null && userId !== undefined) {
        setIsCreatingChatDisabled(true);
        const response = await createChatMutation(userId.toString());
        if ('data' in response && response.data !== undefined) {
          const newChatId = response.data.overai_chat_id;

          setChatList((prevChatList) => [...prevChatList, newChatId]);
          setCreatedChatId(newChatId);
          await fetchChats();
        } else {
          console.error('Invalid response format:', response);
          setError('Ошибка при создании чата.');
        }
      }
    } catch (error) {
      setError('Ошибка при создании чата.');
    } finally {
      setIsCreatingChatDisabled(false);
    }
  };

  const fetchChats = async () => {
    try {
      if (refetchChats) {
        const response = await refetchChats();

        if (response.data && Array.isArray(response.data)) {
          const chatIdsArray = response.data;
          setChatIdsArray(chatIdsArray);
          setChatsLoaded(true);
        }
      }
    } catch (error) {
      setError('Ошибка при получении списка чатов.');
    }
  };


  useEffect(() => {
    setFocusToBottom();
  }, [latestMessages]);

  const handleSendMessage = async (messageInput: string) => {
    if (messageInput.trim() !== '') {
      try {
        setIsLoading(true);
        setIsChatSelectionDisabled(true);
        setIsCreatingChatDisabled(true);

        if (userId !== null) {
          const payload: SendMessagePayload = {
            user_id: userId,
            message: messageInput,
            overai_chat_id: selectedChatId!,
          };

          await sendMessage(payload);

          if (refetchMessages) {
            await refetchMessages();
          }
          
          setMessageInput('');
          setError(null);
        }
      } catch (error: unknown) {
        setError('Ошибка при отправке сообщения.');
      } finally {
        setIsLoading(false);
        setIsChatSelectionDisabled(false);
        setIsCreatingChatDisabled(false);
      }

      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  };

  return (
    <div className="fixed-button">
      <button className={styles.chatGptButton} onClick={toggleDialog}>
        OVER AI
      </button>
      {isDialogOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={`${styles.dialog} ${isDialogOpen && styles.dialogOpen}`}>
            <button className={styles.chatgpt_close} onClick={toggleDialog}>
              <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
            </button>
            <div className={`${styles.contentContainer}`}>
              <div className={`${styles.leftPane} ${isDialogOpen && styles.paneOpen}`}>
              {isFetchingChats ? (
                <div className={styles.loadingSpinner}>
                  <div className={styles.spinner}></div>
                  <span> Получение чатов...</span>
                </div>
              ) : (
                <>
                  <button className={styles.createChatButton} onClick={createChat} disabled={isCreatingChatDisabled}>
                    Создать новый чат
                  </button>
                  {chatIdsArray.map((chatId) => (
                    <div
                      key={chatId}
                      onClick={() => selectChat(chatId)}
                      className={`${styles.chatListItem} ${selectedChatId === chatId ? styles.activeChat : ''}`}
                    >
                      Чат №{chatId}
                    </div>
                  ))}
                </>
              )}
              </div>
              {selectedChatId && (
                <div className={`${styles.rightPane} ${isDialogOpen && styles.paneOpen}`}>
                  <div className={styles.overAiText}>Чат с OVER AI</div>
                  {isLoadingMessages ? (
                    <div className={styles.loadingSpinner}>
                      <div className={styles.spinner}></div>
                      <span> Загрузка сообщений...</span>
                    </div>
                  ) : (
                    <div className={styles.messageContainer} ref={messageContainerRef}>
                      {userQuestions.map((userQuestion: { sender_question: string }, index: number) => (
                        <div key={index} className={index == 1 ? `${styles.message} first-message` : styles.message}>
                          <div className="user-question">
                            <span>
                              <b style={{ color: '#955dd3' }}>Вы:</b> {userQuestion.sender_question}
                            </span>
                          </div>
                          {index < botAnswers.length && (
                            <div className="bot-response" key={index} style={{ wordWrap: 'break-word' }}>
                              {formatBotAnswer(botAnswers[index].answer)}
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
                        <input
                          type="text"
                          placeholder="Задайте вопрос OVER AI"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                        <button onClick={() => handleSendMessage(messageInput)} disabled={isChatSelectionDisabled}>
                          ▲
                        </button>
                      </>
                    )}
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;