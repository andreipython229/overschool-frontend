import React, { useState, useRef, useEffect } from 'react';
import { getUserIdFromLocalStorage } from 'utils/getUserId';
import { LatestMessagesResponse, SendMessagePayload, useSendMessageMutation, useFetchLatestMessagesQuery } from '../../api/chatgptService';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import styles from './chatgpt.module.scss';

interface ChatGPTProps {
  openChatModal: () => void;
  closeChatModal: () => void;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ openChatModal, closeChatModal }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [messageInput, setMessageInput] = useState('');
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const userId = getUserIdFromLocalStorage();
    const { data: latestMessages = [], refetch: refetchMessages } = userId ? useFetchLatestMessagesQuery(userId.toString()) : { data: [], refetch: undefined };
    
    const [sendMessage, mutation] = useSendMessageMutation();
    const [error, setError] = useState<string | null>(null);

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
      }
      setTimeout(() => {
          setError(null);
        }, 10000);
    }
  };
      

  return (
    <div className="fixed-button">
      <button
        className={styles.chatGptButton}
        onClick={toggleDialog}
      >
        OVER AI
      </button>
      {isDialogOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.dialog}>
            <div className={styles.overAiText}>
              OVER AI
            </div>
            <button className={styles.chatgpt_close} onClick={toggleDialog}>
              <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
            </button>
            <div className={styles.messageContainer} ref={messageContainerRef}>
            {latestMessages.slice().reverse().map((msg: LatestMessagesResponse, index: number) => (
            <div key={index} className={styles.message}>
              {msg.sender_question && (
                <div className="bot-response">
                  <span><b>Вы:</b> {msg.sender_question}</span>
                </div>
              )}
              {msg.answer && (
                <div className="bot-response">
                  <span><b>OVER AI:</b> {typeof msg.answer === 'string' ? msg.answer : msg.answer.bot_response}</span>
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
              <input
                type="text"
                placeholder="Задайте вопрос OVER AI"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={() => handleSendMessage(messageInput)}>
                ▲
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;