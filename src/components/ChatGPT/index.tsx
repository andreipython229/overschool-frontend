import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getUserIdFromLocalStorage } from 'utils/getUserId';
import { chatgptService, LatestMessagesResponse } from '../../api/chatgptService';
import styles from './chatgpt.module.scss'

const ChatGPT = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [latestMessages, setLatestMessages] = useState<Array<{ sender_question: string; answer: string }>>([]);
    const userId = getUserIdFromLocalStorage();

    const toggleDialog = () => {
		setIsDialogOpen(!isDialogOpen);
		setFocusToBottom();
	  };  
    
    const setFocusToBottom = () => {
	    if (messageContainerRef.current) {
		messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
		}
	};
  

  const fetchMessages = async () => {
    if (userId) {
      try {
        const latestMessages = await chatgptService.getLatestMessages(userId.toString());
        const formattedMessages: { sender_question: string; answer?: string }[] = latestMessages.map((message, index) => ({
          sender_question: message.sender_question,
          answer: message.answer,
        }));
  
        const reversedMessages = formattedMessages.reverse();
  
        setLatestMessages([
          ...reversedMessages.map((msg) => ({
            sender_question: msg.sender_question,
            answer: msg.answer || '',
          })),
        ]);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      fetchMessages();
    }
  }, [isDialogOpen]);

    const handleSendMessage = async () => {
        if (messageInput.trim() !== '') {
          try {
            const response = await axios.post(
              'http://127.0.0.1:8000/api/chatgpt/send_message/',
              { user_id: userId, message: messageInput },
              { headers: { 'Content-Type': 'application/json' } }
            );
      
            const botResponse = response.data.bot_response;
      
            setLatestMessages([
              ...latestMessages,
              { sender_question: messageInput, answer: '' },
              { sender_question: '', answer: botResponse || '' },
            ]);
      
            setMessageInput('');
          } catch (error) {
            console.error('Error sending message to GPT:', error);
          }
        }
      };

  return (
    <div className="fixed-button">
      <button
        className="btn btn-primary"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 15,
        }}
        onClick={toggleDialog}
      >
        OVER AI
      </button>

      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog">
				<div className="message-container" ref={messageContainerRef}>
					{latestMessages.map((msg, index) => (
						<div key={index} className="message">
						{msg.sender_question && (
              <div className="bot-response">
							<span>Вы: {msg.sender_question}</span>
							</div>
            )}
						{msg.answer && (
							<div className="bot-response">
							<span>OVER AI: {msg.answer}</span>
							</div>
						)}
					    </div>
					))}
					</div>
					<div className="input-container">
					<input
						type="text"
						placeholder="Напишите вопрос OVER AI"
						value={messageInput}
						onChange={(e) => setMessageInput(e.target.value)}
					/>
					<button onClick={() => handleSendMessage()}>Отправить</button>
					</div>
				</div>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;