import { FC, useEffect } from 'react'

import { ChatPanel } from './ChatPanel'
import { ChatWorkspace } from './ChatWorkspace'
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { useFetchChatsQuery } from 'api/chatsService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from './chat.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { setChats } from '../../../store/redux/chats/chatsSlice'
import { RootState } from '../../../store/redux/store'

import { motion } from 'framer-motion'
import { useAppSelector } from 'store/hooks'

type chatT = {
  closeModal: () => void
}

export const Chat: FC<chatT> = ({ closeModal }) => {
  const { data, isFetching, isSuccess, refetch } = useFetchChatsQuery()

  const dispatch = useDispatch()
  const { chats } = useSelector((state: RootState) => state.chats)
  const { chatId } = useAppSelector(state => state.chat)

  useEffect(() => {
    if (data && isSuccess && chats.length === 0) {
      dispatch(setChats(data))
    }
  }, [data, isSuccess])

  return (
    <motion.div
      className={styles.chat}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.5,
        duration: 0.4,
      }}
    >
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
    </motion.div>
  )
}
