import {ChangeEvent, FC, useEffect, useState} from 'react'
import { ChatI } from 'types/chatsT'
import {RoleE} from 'enum/roleE'
import {headerUserRoleName} from "../../../config";
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { chatsGroup } from 'config/commonSvgIconsPath'
import { getNounDeclension } from 'utils/getNounDeclension'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { deepPurple } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';

import styles from './chat.module.scss'
import {useDebounceFunc} from "../../../customHooks";
import {formDataConverter} from "../../../utils/formDataConverter";
import { usePatchChatMutation} from "../../../api/chatsService";
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import {useAppSelector} from "../../../store/hooks";
import {selectUser} from "../../../selectors";

type chatUserT = {
  openGroup?: (isOpen: boolean) => void
  chatData: ChatI
  usersCount?: number
}

export const ChatUser: FC<chatUserT> = ({ openGroup, chatData, usersCount }) => {

  const { role } = useAppSelector(selectUser)
  const { userId } = useAppSelector(state => state.user)

  const [changeChatName, setChangeChatName] = useState<string>(chatData?.name || 'Группа без имени')
  const [checked, setChecked] = useState<boolean | undefined>(!chatData?.is_deleted);
  const [isDeleted, setIsDeleted] = useState<boolean | undefined>(undefined);

  const [label, setLabel] = useState<string>('')

  const [changeChat] = usePatchChatMutation()
  const debounced = useDebounceFunc(changeChat, 2000)

  const handleChangeChatName = (event: ChangeEvent<HTMLInputElement>) => {
    setChangeChatName(event.target.value)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  }

  const getInterlocutor = (chat: ChatI) => {
      const sender1 = chat.senders.filter((sender) => sender.id !== userId);
      return sender1[0]
  }

  useEffect(() => {
    if (changeChatName && (chatData?.is_deleted !== undefined)) {
      if (chatData?.name !== changeChatName || chatData?.is_deleted !== isDeleted) {
        const updateChat = {
                name: changeChatName,
                chat_uuid: chatData?.id || '',
                is_deleted: isDeleted
          }

        if (updateChat.name && updateChat.chat_uuid && (updateChat.is_deleted !== undefined)) {
            const formdata = formDataConverter(updateChat)
            console.log(updateChat)
            if (formdata) {
              debounced({ formdata })
            }
        }
      }
    }
  },[changeChatName, isDeleted])

  useEffect(() => {
    setChangeChatName(chatData?.name || 'Пусто')
    setChecked(!chatData?.is_deleted)
    setIsDeleted(chatData?.is_deleted)
  }, [chatData])

  useEffect(() => {
    if (checked) {
      setLabel("Выключить чат")
    } else {
      setLabel("Включить чат")
    }
    setIsDeleted(!checked)
  }, [checked])

  return (
    <div className={styles.chatUser}>
      <div>
        <div className={styles.chatUser_info}>
          {/*<SettingsOutlinedIcon sx={{ color: deepPurple['A100'], fontSize: 24 }} />*/}
          {/*<div className={styles.chatUser_avatar}>*/}
          {/*  <IconSvg width={20} height={20} viewBoxSize="0 0 24 24" path={chatsGroup} />*/}
          {/*</div>*/}
          <div>

              {/*<p className={styles.chatUser_name}>{chatData?.name || 'Группа без имени'}</p>*/}
              {/*<input type="text"  value={changeChatName} onChange={handleChangeChatName}/>*/}


              {role === RoleE.Teacher ? (
                  <>
                    <div className={styles.chatUser_nameWrapper}>
                      {chatData?.type === 'GROUP' ? (
                           <TextField id="standard-basic" variant="standard" value={changeChatName} onChange={handleChangeChatName} style={{width: '300px'}}/>
                      ) : chatData?.type === 'PERSONAL' ? (
                          // <TextField id="s" variant="standard" disabled value={`${getInterlocutor(chatData).first_name || 'Группа без имени'} ${getInterlocutor(chatData).last_name || ''}`} onChange={handleChangeChatName} style={{width: '300px'}}/>
                          <span style={{width: '500px'}}>{getInterlocutor(chatData).first_name || 'Группа без имени'} {getInterlocutor(chatData).last_name || ''}</span>
                      ) : null}
                      <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label={<span style={{ fontSize: '12px' }}>{label}</span>} sx={{marginLeft: '130px', fontSize: '10px'}}/>
                    </div>
                    {chatData?.type === 'GROUP' ? (
                        <p className={styles.chatUser_lastVisit} onClick={() => openGroup && openGroup(true)}>
                          {usersCount && `${usersCount} ` + getNounDeclension(usersCount, ['участник', 'участника', 'участников'])}
                        </p>
                    ) : null}
                  </>
              ) : role === RoleE.Student ? (
                  <>
                    {chatData?.type === 'GROUP' ? (
                        <p>{chatData?.name || 'Группа без имени'}</p>
                    ) : chatData?.type === 'PERSONAL' ? (
                        <p>{getInterlocutor(chatData).first_name || 'Группа без имени'} {getInterlocutor(chatData).last_name || ''}</p>
                    ) : null}
                  </>
              ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
