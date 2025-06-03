import { FC, useEffect, useState } from 'react'

import { ChatPanel } from './ChatPanel'
import { ChatWorkspace } from './ChatWorkspace'
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Chats } from 'types/chatsT'
import { useFetchChatsQuery } from 'api/chatsService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from './chat.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { setChats, updateLastMessage, updateUnreadCount } from '../../../store/redux/chats/chatsSlice'
import { RootState } from '../../../store/redux/store'

import { motion } from 'framer-motion'
import { useAppSelector } from 'store/hooks'

type ChatProps = {
  closeModal: () => void;
  studentId?: number;  // Делаем необязательным, если нужно сохранить обратную совместимость
  // или
  // studentId: number; // Если ID обязателен
}

export const Chat: FC<ChatProps> = ({ closeModal, studentId }) => {
  const { data, isFetching, isSuccess, refetch } = useFetchChatsQuery();
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chats.chats);
  const { chatId } = useAppSelector(state => state.chat);

  // Логируем полученный studentId
  useEffect(() => {
    if (studentId) {
      console.log('Chat opened for student ID:', studentId);
      // Здесь можно добавить логику загрузки чата для конкретного студента
    }
  }, [studentId]);

  useEffect(() => {
    isSuccess && dispatch(setChats(data));
  }, [isFetching]);

  return (
    <motion.div
      className={styles.chat}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
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
  );
};

// export const Chat: FC<chatT> = ({ closeModal }) => {
//   // const [chats, setChats] = useState<Chats>([])
//   const { data, isFetching, isSuccess, refetch } = useFetchChatsQuery()
//
//   const dispatch = useDispatch()
//   const chats = useSelector((state: RootState) => state.chats.chats)
//   const { chatId } = useAppSelector(state => state.chat)
//   console.log(chatId)
//
//   useEffect(() => {
//     isSuccess && dispatch(setChats(data))
//   }, [isFetching])
//   //
//   // useEffect(() => {
//   //     return () => {
//   //         setChats([]); // очищаем состояние при размонтировании
//   //     };
//   // }, []);
//   //
//   // useEffect(() => {
//   //     if (data && isFetching) {
//   //         dispatch(setChats(data));
//   //         console.log("index = ",data)
//   //     }
//   // }, [data, dispatch])
//   //
//   // useEffect(() => {
//   //     refetch();
//   // }, [])
//
//   return (
//     <motion.div
//       className={styles.chat}
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//       }}
//       exit={{
//         opacity: 0,
//       }}
//       transition={{
//         delay: 0.5,
//         duration: 0.4,
//       }}
//     >
//       {isFetching && (
//         <div className={styles.chat_loader}>
//           <SimpleLoader style={{ width: '50px', height: '50px' }} />
//         </div>
//       )}
//       <button className={styles.chat_close} onClick={closeModal}>
//         <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
//       </button>
//       <ChatPanel chats={chats} />
//       <ChatWorkspace />
//     </motion.div>
//   )
// }
