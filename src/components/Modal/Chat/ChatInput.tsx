import { ChangeEvent, FC, KeyboardEvent } from 'react'

import styles from './chat.module.scss'
import {IconSvg} from "../../common/IconSvg/IconSvg";
import {sendArrPath, updateArrPath} from "../../AllStudentsBlock/config/svgIconsPath";

type chatInputT = {
  message: string
  handleSubmit: () => void
  handleChangeMessage: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ChatInput: FC<chatInputT> = ({ message, handleSubmit, handleChangeMessage }) => {

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleSubmit();
        }
    }

    return (
    <div className={styles.chatInput}>
      <input
        className={styles.chatInput_input}
        type="text"
        name="message"
        value={message}
        placeholder="Напишите сообщение..."
        onChange={handleChangeMessage}
        onKeyDown={handleKeyPress}
      />
      <div className={styles.chatInput_send} onClick={handleSubmit}>
          <IconSvg width={30} height={20} viewBoxSize="0 0 30 20" path={sendArrPath} />
      </div>
    </div>
  )
}
