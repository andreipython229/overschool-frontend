import React, { FC, useState, useRef } from 'react'
import { Dialog, DialogContent, Typography } from '@mui/material'
import { Button } from 'components/common/Button/Button'
import styles from './chatList.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { TrashIconPath } from '../../../assets/Icons/svgIconPath'

interface Chat {
  order: number
  chat_name: string
}

interface ChatData {
  [id: number]: Chat
}

interface ChatListProps {
  showChatListForm: boolean
  setShowChatListForm: (show: boolean) => void
  chatData: ChatData
  selectedChatId: number
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, chatId: number) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, chatId: number) => void
  handleDragEnd: () => void
  selectChat: (chatId: number | undefined) => void
  handleDeleteChat: (chatId: number) => void
  isCreatingChatDisabled: boolean
  handleCreateChat: () => void
}

export const ChatList: FC<ChatListProps> = ({
  showChatListForm,
  setShowChatListForm,
  chatData,
  selectedChatId,
  handleDragOver,
  handleDragStart,
  handleDragEnd,
  selectChat,
  handleDeleteChat,
  isCreatingChatDisabled,
  handleCreateChat,
}) => {
  const activeChatRef = useRef<HTMLDivElement | null>(null)
  const [draggedOverChatId, setDraggedOverChatId] = useState<number | null>(null)

  const handleCloseModal = () => {
    setShowChatListForm(false)
  }

  return (
    <>
      <Dialog
        className={styles.modal_background}
        open={showChatListForm}
        onClose={() => setShowChatListForm(false)}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#fff',
            borderRadius: '24px',
            padding: '10px 10px 50px 10px',
            width: {
              xs: '95%',
              sm: '70%',
            },
          },
          '& .MuiDialogContent-root': {
            padding: '0',
          },
          '& .MuiTypography-root': {
            margin: '0 auto',
          },
        }}
      >
        <DialogContent className={styles.modal_close}>
          <Button className={styles.modal_close_btn} text="" onClick={handleCloseModal}>
            <div className={styles.modal_close_btn_cross}></div>
          </Button>
        </DialogContent>
        <Typography className={styles.modal_header_text}>История чатов</Typography>
        <DialogContent className={styles.modal_list}>
          <button
            className={styles.createChatButtonModal}
            onClick={() => {
              handleCreateChat()
              setShowChatListForm(false)
            }}
            disabled={isCreatingChatDisabled}
          >
            Создать новый чат
          </button>
          <div className={styles.modal_list_scroll}>
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
                        setShowChatListForm(false)
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
                    <button
                      className={`${styles.deleteChatBtn}  ${selectedChatId === Number(chatId) ? styles.activeDeleteChatBtn : ''}`}
                      onClick={e => {
                        handleDeleteChat(Number(chatId))
                      }}
                    >
                      <IconSvg path={TrashIconPath} width={24} height={24} viewBoxSize={'0 0 24 24'}></IconSvg>
                    </button>
                  </div>
                )
              })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
