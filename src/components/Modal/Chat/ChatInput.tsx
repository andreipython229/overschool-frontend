import { ChangeEvent, FC } from 'react'

import styles from './chat.module.scss'

type chatInputT = {
  message: string
  handleSubmit: () => void
  handleChangeMessage: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ChatInput: FC<chatInputT> = ({ message, handleSubmit, handleChangeMessage }) => {
  return (
    <form className={styles.chatInput}>
      <input
        className={styles.chatInput_input}
        type="text"
        name="message"
        value={message}
        placeholder="Напишите сообщение..."
        onChange={handleChangeMessage}
      />
      <button onClick={handleSubmit}></button>
    </form>
  )
}
