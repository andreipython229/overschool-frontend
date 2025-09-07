import React, { FC, useState } from 'react'
import styles from './chatgpt.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'

interface ChatGPTProps {
  isDialogOpen: boolean
  onClose: () => void
}

export const ChatGPT: FC<ChatGPTProps> = ({ isDialogOpen, onClose }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }])
      setMessage('')
      // Здесь будет логика отправки сообщения в API
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle message submission
    console.log('Message submitted:', message)
    setMessage('')
  }

  if (!isDialogOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2>ChatGPT</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <IconSvg path={crossIconPath} width={24} height={24} />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${msg.isUser ? styles.userMessage : styles.aiMessage}`}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
        <form className={styles.inputArea} onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
