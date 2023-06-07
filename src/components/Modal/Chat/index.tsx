import { FC, useEffect, useState } from 'react'

import { ChatPanel } from './ChatPanel'
import { ChatWorkspace } from './ChatWorkspace'
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Chats } from 'types/chatsT'
import { useFetchChatsQuery } from 'api/chatsService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from './chat.module.scss'

type chatT = {
  closeModal: () => void
}

export const Chat: FC<chatT> = ({ closeModal }) => {
  const [chats, setChats] = useState<Chats>()
  const { data, isFetching, isSuccess } = useFetchChatsQuery()

  useEffect(() => {
    isSuccess && setChats(data)
  }, [isFetching])

  return (
    <div className={styles.chat}>
      {isFetching && (
        <div className={styles.chat_loader}>
          <SimpleLoader style={{ width: '50px', height: '50px' }} />
        </div>
      )}
      <button className={styles.chat_close} onClick={closeModal}>
        <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
      </button>
      <ChatPanel chats={chats} />
      <ChatWorkspace />
    </div>
  )
}
