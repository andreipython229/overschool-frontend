import { FC, useEffect, useState } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { ChatI, PersonalChatI, SenderI} from 'types/chatsT'
import { getNounDeclension } from 'utils/getNounDeclension'
import { useAppDispatch, useAppSelector} from 'store/hooks'
import { useCreatePersonalChatMutation} from "../../../api/chatsService";
import { backArr } from 'components/Previous/config/svgIconPath'

import styles from './chat.module.scss'
import {selectChat} from "../../../store/redux/chats/slice";

type chatGroupPreviewT = {
  closeGroup: (isOpen: boolean) => void
  usersList: SenderI[]
  chatData: ChatI
}

export const ChatGroupPreview: FC<chatGroupPreviewT> = ({ closeGroup, usersList, chatData }) => {
  const { userId } = useAppSelector(state => state.user)
  const {chats} = useAppSelector(state => state.chats)
  const dispatch = useAppDispatch()
  const [users, setUsers] = useState<SenderI[]>()

  const [createPersonalChat, { isLoading }] = useCreatePersonalChatMutation()

  useEffect(() => {
    usersList && setUsers(usersList)
  }, [usersList])

  useEffect(() => {
    console.log(chatData)
  },[chatData])

  const createChatHundler = async (student: SenderI, teacherId: number) => {
    try {
      if (student.id && teacherId) {
        const personalChatData = new FormData();
        personalChatData.append('teacher_id', teacherId.toString());
        personalChatData.append('student_id', student.id.toString());
        personalChatData.append('message', "Приветствую в персональном чате");

        const response = await createPersonalChat(personalChatData);
      }
    } catch (error) {
      // Обработка ошибки
      console.error('Произошла ошибка при создании персонального чата:', error);

    }
  }

  const goToChatHundler = (sender: SenderI, userId: number) => {
    const chat = chats.find((chat: ChatI) => {
        return chat.type === 'PERSONAL' && chat.senders.some(s => s.id === sender.id);
      })
    if (chat?.id) {
      closeGroup(false)
      dispatch(selectChat(chat.id))
    }
  }

  const findPersonalChatWithSender = (sender: SenderI) => {
      return chats.some((chat: ChatI) => {
        return chat.type === 'PERSONAL' && chat.senders.some(s => s.id === sender.id);
      })
  }

  return (
    <div className={styles.chatGroup}>
      <div className={styles.chatGroup_header}>
        <div>
          <div className={styles.chatGroup_header_info} onClick={() => closeGroup && closeGroup(false)}>
            <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
            <span>Чат</span>
          </div>
          <div className={styles.chatGroup_header_preview}>
            <span>{chatData.name || 'Группа без имени '}</span>
            <span>{usersList && ` - ${usersList.length} ${getNounDeclension(usersList.length, ['участник', 'участника', 'участников'])}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.chatGroup_content}>
        <div className={styles.chatGroup_content_track}>
          {users?.map(sender => (
            <div key={sender.id} className={styles.chatGroup_content_user}>
              <div className={styles.chatGroup_content_user_info}>
                <div className={styles.chatGroup_content_user_avatar}>
                  {sender?.avatar ? (
                    <img src={`${sender.avatar}`} alt="avatar" />
                  ) : (
                    `${sender?.first_name[0] || 'Б'}${sender?.last_name[0] || 'И'}`
                  )}
                </div>
                <div>
                  {sender.first_name || 'Без'} {sender.last_name || 'Имени'}
                </div>
              </div>
              {userId !== sender.id && (
                  <>
                    {!findPersonalChatWithSender(sender)  ? (
                        <Button text="Создать чат" variant="primary" onClick={e => {createChatHundler(sender, userId)}}/>
                    ) : (
                        <Button text="Перейти в чат" variant="primary" onClick={e => {goToChatHundler(sender, userId)}}/>
                    )}
                  </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
