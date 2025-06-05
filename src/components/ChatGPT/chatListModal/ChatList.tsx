import React, { FC, useEffect, useState, useRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Button } from 'components/common/Button/Button'
import { Modal } from 'components/common/Modal/Modal'
import styles from './chatList.module.scss';

import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { TrashIconPath } from '../../../assets/Icons/svgIconPath';

interface Chat {
  order: number;
  chat_name: string;
}

interface ChatData {
  [id: number]: Chat;
}

interface ChatListProps {
  isOpen: boolean;
  onClose: () => void;
  chats: any[];
  selectedChatId: number;
  onSelectChat: (chatId: number) => void;
  onDeleteChat: (chatId: number) => void;
  onCreateChat: () => void;
  isCreatingChatDisabled: boolean;
}

export const ChatList: FC<ChatListProps> = ({
  isOpen,
  onClose,
  chats,
  selectedChatId,
  onSelectChat,
  onDeleteChat,
  onCreateChat,
  isCreatingChatDisabled
}) => {
  const activeChatRef = useRef<HTMLDivElement | null>(null);
  const [draggedOverChatId, setDraggedOverChatId] = useState<number | null>(null);

  const handleCloseModal = () => {
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Список чатов"
      variant="gradient"
      width="400px"
    >
      <div className={styles.content}>
        <Button
          className={styles.createChatButton}
          onClick={onCreateChat}
          disabled={isCreatingChatDisabled}
          text="Создать новый чат"
        />

        <div className={styles.chatList}>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${selectedChatId === chat.id ? styles.selected : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <span className={styles.chatName}>{chat.name}</span>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteChat(chat.id)
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}