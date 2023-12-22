import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { getUserIdFromLocalStorage } from 'utils/getUserId';
import { chatgptService, LatestMessagesResponse, SendMessagePayload, SendMessageResponse, ChatgptService, useSendMessageMutation, useFetchLatestMessagesQuery } from '../../api/chatgptService';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { useMutation } from 'react-query';
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
    const { data: latestMessages = [], refetch: refetchMessages } = useFetchLatestMessagesQuery(userId?.toString() || '');
    const [sendMessage, mutation] = useSendMessageMutation();

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
        await refetchMessages();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };


  useEffect(() => {
    const fetchData = async () => {
      if (isDialogOpen) {
        setFocusToBottom();
        await fetchMessages();
      }
    };

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
          console.log(payload);
          
          await sendMessage(payload);
  
          await refetchMessages();
  
          setMessageInput('');
        }
      } catch (error: unknown) {
        console.error('Error sending message to GPT:', error);
        if ((error as AxiosError)?.response) {
          console.error('Error details:', ((error as AxiosError).response as any).data);
        } else {
          console.error('Error details:', error);
        }
      }
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