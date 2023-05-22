import { FC } from 'react'

import { Input } from 'components/common/Input/Input/Input'

import styles from './chat.module.scss'

export const ChatInput: FC = () => {
  return (
    <div className={styles.chatInput}>
      <input className={styles.chatInput_input} type="text" name="message" value="" placeholder="Напишите сообщение..." />
    </div>
  )
}
