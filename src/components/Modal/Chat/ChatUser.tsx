import { ChangeEvent, FC, useEffect, useState } from 'react'
import { ChatI } from 'types/chatsT'
import { RoleE } from 'enum/roleE'
import { getNounDeclension } from 'utils/getNounDeclension'
import FormControlLabel from '@mui/material/FormControlLabel'
import styles from './chat.module.scss'
import { useDebounceFunc } from '../../../customHooks'
import { formDataConverter } from '../../../utils/formDataConverter'
import { usePatchChatMutation } from '../../../api/chatsService'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../selectors'
import { chatGroup, chatCourse } from '../../../assets/img/common/'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { iconBackPath } from './assets/icon'
import { removeChat } from 'store/redux/chats/slice'

type chatUserT = {
  openGroup?: (isOpen: boolean) => void
  chatData: ChatI
  usersCount?: number
}

export const ChatUser: FC<chatUserT> = ({ openGroup, chatData, usersCount }) => {
  const { role } = useAppSelector(selectUser)
  const { userId } = useAppSelector(state => state.user)
  const { chatId } = useAppSelector(state => state.chat)
  const dispatch = useAppDispatch()

  const [changeChatName, setChangeChatName] = useState<string>(chatData?.name || 'Анонимная')
  const [checked, setChecked] = useState<boolean | undefined>(!chatData?.is_deleted)
  const [isDeleted, setIsDeleted] = useState<boolean | undefined>(undefined)

  const [label, setLabel] = useState<string>('')

  const [changeChat] = usePatchChatMutation()
  const debounced = useDebounceFunc(changeChat, 2000)

  const handleChangeChatName = (event: ChangeEvent<HTMLInputElement>) => {
    setChangeChatName(event.target.value)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const getInterlocutor = (chat: ChatI) => {
    const sender1 = chat.senders.filter(sender => sender.id !== userId)
    return sender1[0]
  }

  useEffect(() => {
    if (changeChatName && chatData?.is_deleted !== undefined) {
      if (chatData?.name !== changeChatName || chatData?.is_deleted !== isDeleted) {
        const updateChat = {
          name: changeChatName,
          chat_uuid: chatData?.id || '',
          is_deleted: isDeleted,
        }

        if (updateChat.name && updateChat.chat_uuid && updateChat.is_deleted !== undefined) {
          const formdata = formDataConverter(updateChat)
          console.log(updateChat)
          if (formdata) {
            debounced({ formdata })
          }
        }
      }
    }
  }, [changeChatName, isDeleted])

  useEffect(() => {
    setChangeChatName(chatData?.name || 'Пусто')
    setChecked(!chatData?.is_deleted)
    setIsDeleted(chatData?.is_deleted)
  }, [chatData])

  useEffect(() => {
    if (checked) {
      setLabel('Выключить чат')
    } else {
      setLabel('Включить чат')
    }
    setIsDeleted(!checked)
  }, [checked])

  return (
    <div className={styles.chatUser}>
      <div>
        <div className={styles.chatUser_info}>
          {chatId && (
            <div onClick={() => dispatch(removeChat())} style={{ cursor: 'pointer' }}>
              <IconSvg path={iconBackPath} viewBoxSize="0 0 7 11" width={7} height={11} />
            </div>
          )}
          {chatData && chatData.senders.length > 0 && (
            <img
              className={styles.chatPreview_avatarWrap_avatar}
              style={{ height: '3rem', width: '3rem' }}
              alt="Информационный канал"
              src={getInterlocutor(chatData) ? getInterlocutor(chatData).avatar : ''}
            />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            {role === RoleE.Teacher || role === RoleE.Admin ? (
              <>
                <div className={styles.chatUser_nameWrapper}>
                  {chatData?.type === 'GROUP' ? (
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      value={changeChatName}
                      onChange={handleChangeChatName}
                      style={{ width: '300px' }}
                    />
                  ) : chatData?.type === 'PERSONAL' ? (
                    <span style={{ width: '500px' }}>
                      {getInterlocutor(chatData).first_name || 'Без имени'} {getInterlocutor(chatData).last_name || 'Без фамилии'}
                    </span>
                  ) : null}
                  {/* <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label={<span style={{ fontSize: '12px' }}>{label}</span>}
                    sx={{ marginLeft: '95px', fontSize: '10px' }}
                  /> */}
                </div>

                {chatData?.type === 'GROUP' ? (
                  <p className={styles.chatUser_lastVisit} onClick={() => openGroup && openGroup(true)}>
                    {usersCount && `${usersCount} ` + getNounDeclension(usersCount, ['участник', 'участника', 'участников'])}
                  </p>
                ) : (
                  <p className={styles.chatUser_lastVisit} onClick={() => openGroup && openGroup(true)}>
                    Не в сети
                  </p>
                )}
              </>
            ) : role === RoleE.Student ? (
              <>
                {chatData?.type === 'GROUP' ? (
                  <p>{chatData?.name || 'Анонимная'}</p>
                ) : chatData?.type === 'PERSONAL' ? (
                  <p style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>
                    {getInterlocutor(chatData).first_name || 'Анонимная'} {getInterlocutor(chatData).last_name || ''}
                  </p>
                ) : null}
                <p className={styles.chatUser_lastVisit} onClick={() => openGroup && openGroup(true)}>
                  Не в сети
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
