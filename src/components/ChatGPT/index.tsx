import React, { useState, useRef, useEffect } from 'react';
import { getUserIdFromLocalStorage } from 'utils/getUserId';
import { SendMessagePayload, useSendMessageMutation, useFetchLatestMessagesQuery } from '../../api/chatgptService';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import styles from './chatgpt.module.scss';
import { log } from 'console';

interface ChatGPTProps {
  openChatModal: () => void;
  closeChatModal: () => void;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ openChatModal, closeChatModal }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [messageInput, setMessageInput] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const userId = getUserIdFromLocalStorage();
  const { data: latestMessages = [], refetch: refetchMessages } = userId
    ? useFetchLatestMessagesQuery(userId.toString())
    : { data: [], refetch: undefined };

  const [sendMessage, mutation] = useSendMessageMutation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userQuestions = Array.isArray(latestMessages[0]) ? latestMessages[0] : [];
  const botAnswers = Array.isArray(latestMessages[1]) ? latestMessages[1] : [];

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

  const fetchMessages = async () => {
    try {
      if (refetchMessages) {
        await refetchMessages();
      }
      
    } catch (error) {
      setError('Ошибка при получении истории сообщений.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isDialogOpen) {
        setFocusToBottom();
        await fetchMessages();
      }
    };

    setError(null);

    fetchData();
  }, [isDialogOpen]);

  useEffect(() => {
    setFocusToBottom();
  }, [latestMessages]);

  const handleSendMessage = async (messageInput: string) => {
    if (messageInput.trim() !== '') {
      try {
        setIsLoading(true);

        if (userId !== null) {
          const payload: SendMessagePayload = {
            user_id: userId.toString(),
            message: messageInput,
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
        <div className={styles.modalOverlay}>
          <div className={styles.dialog}>
            <div className={styles.overAiText}>OVER AI</div>
            <button className={styles.chatgpt_close} onClick={toggleDialog}>
              <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
            </button>
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
                <button onClick={() => handleSendMessage(messageInput)}>▲</button>
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